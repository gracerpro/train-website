import fs from "node:fs/promises"
//import path from "node:path"
//import { fileURLToPath } from "node:url"
import express from "express"

// Constants
const isProduction = process.env.NODE_ENV === "production"
const port = process.env.PORT || 8101
const base = process.env.BASE_URL || "/"

// Cached production assets
const templateHtml = isProduction ? await fs.readFile("./dist/client/index.html", "utf-8") : ""
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined

createServer()

async function createServer() {
  const app = express()

  // Add Vite or respective production middlewares
  let vite

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite")

    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
    })
    // Use vite's connect instance as middleware. If you use your own
    // express router (express.Router()), you should use router.use
    // When the server restarts (for example after the user modifies
    // vite.config.js), `vite.middlewares` is still going to be the same
    // reference (with a new internal stack of Vite and plugin-injected
    // middlewares). The following is valid even after restarts.
    app.use(vite.middlewares)
  } else {
    const compression = (await import("compression")).default
    const sirv = (await import("sirv")).default
    app.use(compression())
    app.use(base, sirv("./dist/client", { extensions: [] }))
  }

  app.get("/{*splat}", async (request, response /*, next */) => {
    console.log(`orig url "${request.originalUrl}"`)
    const url = request.originalUrl.replace(base, "")
    console.log(`url "${url}"`)

    try {
      const { html, statusCode } = await getAppHtml(vite, url)

      // 6. Send the rendered HTML back.
      response.status(statusCode).set({ "Content-Type": "text/html" }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite?.ssrFixStacktrace(e)
      console.log(e.stack)

      //next(e)

      response.status(500).end(e.stack)
    }
  })

  app.listen(port)
}

/**
 * @param {ViteDevServer} vite
 * @param {String} url
 * @returns {String}
 */
async function getAppHtml(vite, url) {
  let template
  let render

  if (!isProduction) {
    // 1. Read index.html
    // Always read fresh template in development
    const localTemplateHtml = await fs.readFile("./index.html", "utf-8")

    // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
    //    and also applies HTML transforms from Vite plugins, e.g. global
    //    preambles from @vitejs/plugin-react
    template = await vite.transformIndexHtml(url, localTemplateHtml)

    // 3. Load the server entry. ssrLoadModule automatically transforms
    //    ESM source code to be usable in Node.js! There is no bundling
    //    required, and provides efficient invalidation similar to HMR.
    render = (await vite.ssrLoadModule("/src/entry-server.js")).render
  } else {
    template = templateHtml
    render = (await import("./dist/server/entry-server.js")).render
  }

  // 4. render the app HTML. This assumes entry-server.js's exported
  //     `render` function calls appropriate framework SSR APIs,
  //    e.g. ReactDOMServer.renderToString()
  const appHtml = await render(url, ssrManifest)

  console.log("preloadLinks", appHtml.preloadLinks)

  // 5. Inject the app-rendered HTML into the template.
  const html = template
    .replace(`<!--app-head-->`, appHtml.preloadLinks ?? "")
    .replace(`<!--app-html-->`, appHtml.html ?? "")

  return {
    html,
    statusCode: 200,
  }
}
