// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from "node:fs"
import path from "node:path"
import url from "node:url"
import { gzip } from "node-gzip"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute("dist/static/.vite/ssr-manifest.json"), "utf-8"),
)
const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8")
const { render } = await import("./dist/server/entry-server.js")

const urls = await readUrlsFromViews()
await createFiles(urls)

// done, delete .vite directory including ssr manifest
fs.rmSync(toAbsolute("dist/static/.vite"), { recursive: true })

/////////////////////////////////////////////////////

async function createFiles(urls) {
  const basePath = "./dist/static"
  console.log("base path", basePath)

  for (const url of urls) {
    const { html: appHtml, preloadLinks } = await render(url, manifest)

    const html = template
      .replace("<!--app-head-->", preloadLinks)
      .replace("<!--app-html-->", appHtml)

    const resultUrl = (url == "/" ? "/index" : url) + ".html"
    const filePath = basePath + resultUrl
    fs.writeFileSync(filePath, html)
    const compressedHtml = await gzip(html)
    fs.writeFileSync(filePath + ".gz", compressedHtml)

    console.log("pre-rendered:", resultUrl, "size", html.length, "zip size", compressedHtml.length)
  }
}

/**
 * @returns {Promise<String[]>}
 */
async function readUrlsFromViews() {
  console.log("Read urls from views...")

  const urls = []
  const files = fs.readdirSync("./src/views", { withFileTypes: true, recursive: false })

  for (let i = 0; i < files.length; ++i) {
    const file = files[i]

    if (!file.isFile()) {
      continue
    }

    let name = getUrlName(file.name)

    if (name == null) {
      continue
    }

    console.log("-", name)

    if (name === "home") {
      urls.push("/")
    } else {
      urls.push("/" + name)
    }
  }

  return urls
}

/**
 * @param {String} fileName
 * @returns {String|null}
 */
function getUrlName(fileName) {
  if (fileName.substring(0, 3) !== "The") {
    return null
  }
  if (fileName.substring(fileName.length - 1 - 7) !== "View.vue") {
    return null
  }

  const name = fileName
    .substring(3) // remove "The"
    .substring(0, fileName.length - 8 /* "View.vue" */ - 3 /* "The" */)

  return camelToKebab(name)
}

/**
 * @param {String} text
 * @returns {String}
 */
function camelToKebab(text) {
  return text
    .split("")
    .map((letter, i) => {
      return letter.toUpperCase() === letter
        ? `${i !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter
    })
    .join("")
}
