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
    const { html: appHtml, preloadLinks, page } = await render(url, manifest)

    const html = modifyHtml(appHtml, preloadLinks, page ?? {})

    const resultUrl = (url == "/" ? "/index" : url) + ".html"
    const filePath = basePath + resultUrl
    fs.writeFileSync(filePath, html)
    const compressedHtml = await gzip(html)
    fs.writeFileSync(filePath + ".gz", compressedHtml)

    console.log("pre-rendered:", resultUrl, "size", html.length, "zip size", compressedHtml.length)
  }
}

function modifyHtml(appHtml, preloadLinks, page) {
  let html = template.replace("<!--app-head-->", preloadLinks)

  const title = page.title ? page.title : "Мобильное приложение для учёта тренировок"
  html = html.replace("<!--page-title-->", title)

  const description = page.description
    ? page.description
    : "Простое приложение с базовым функционалом. Учёт тренировок, просмотр статистики, импорт и экспорт."
  html = html.replace("<!--page-description-->", description)

  const keywords = page.keywords
    ? page.keywords
    : "gps-трекинг, маршрут, тренировки, спорт, велосипед, бег, ходьба"
  html = html.replace("<!--page-keywords-->", keywords)

  return html.replace("<!--app-html-->", appHtml)
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

  fs.readdirSync("./src/views/status-pages", { withFileTypes: true, recursive: false }).forEach(
    (file) => {
      if (!file.isFile()) {
        return
      }

      let name = getStatusUrlName(file.name)
      console.log("-", name)

      urls.push(`/${name}`)
    },
  )

  return urls
}

/**
 * @param {String} fileName
 * @returns {String|null}
 */
function getStatusUrlName(fileName) {
  if (fileName.substring(0, 3) !== "The") {
    return null
  }
  if (fileName.substring(fileName.length - 4) !== ".vue") {
    return null
  }

  const name = fileName
    .substring(3) // remove "The"
    .substring(0, fileName.length - 4 /* ".vue" */ - 3 /* "The" */)

  return camelToKebab(name)
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
