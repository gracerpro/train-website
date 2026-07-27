// Pre-render the app into static HTML.

import fs from "node:fs"
import { getHtml, type AppSsrManifest } from "./src/server-common.ts"
import { gzip } from "node-gzip"

const manifest: AppSsrManifest = JSON.parse(
  fs.readFileSync("./dist/static/.vite/ssr-manifest.json", "utf-8"),
)
const template = fs.readFileSync("./dist/static/index.html", "utf-8")
const { render } = await import("./dist/server/entry-server.js")

const STATUS_PAGES_NAME = "status-pages"

const enLocale = "en"

const { isClean } = parseParameters(process.argv)

initDirectories()
const urls = await readUrlsFromViews()
console.log(urls)
await createFiles(urls)

if (isClean) {
  // done, delete .vite directory including ssr manifest
  fs.rmSync("./dist/static/.vite", { recursive: true })
}

/////////////////////////////////////////////////////

function parseParameters(argv: Array<string>) {
  let isClean = true

  argv.forEach((arg) => {
    const keyValue = arg.split("=")
    const key = keyValue[0]
    const value = keyValue[1] ?? undefined

    if (key === "--clean" && value === "0") {
      isClean = false
    }
  })

  return {
    isClean,
  }
}

async function createFiles(urls: Array<string>) {
  console.log("Create a files...")

  const enUrl = `/${enLocale}`
  const basePath = "./dist/static"
  console.log("base path", basePath)

  for (const url of urls) {
    console.log('get html for url "' + url + '"')

    const { html } = await getHtml({
      url,
      manifest,
      template,
      render,
    })

    let path: string

    if (url === "/") {
      path = "/index"
    } else if (url === enUrl) {
      path = `${enUrl}/index`
    } else {
      path = url
    }
    const pathName = path + ".html"
    const filePath = basePath + pathName
    fs.writeFileSync(filePath, html)
    const compressedHtml = await gzip(html)
    fs.writeFileSync(filePath + ".gz", compressedHtml)

    console.log("pre-rendered", pathName, "size", html.length)
  }
}

async function readUrlsFromViews(): Promise<Array<string>> {
  console.log("Read urls from view...")

  const dynamicNamesMap: { [key: string]: boolean } = {}
  const urls: Array<string> = []
  const files = fs.readdirSync("./src/views", { withFileTypes: true, recursive: false })

  for (let i = 0; i < files.length; ++i) {
    const file = files[i]

    if (file.name === STATUS_PAGES_NAME) {
      continue
    }

    const name = file.isFile() ? getUrlName(file.name) : file.name
    console.log("NAME", name)

    if (name === null) {
      console.log("NAME IS NULL")
    } else if (dynamicNamesMap[name]) {
      console.log(`- dynamic name! "${name}", get names...`)
      const names = await getDynamicNames(name)
      console.log("found", names.length)

      names.forEach((dynamicName) => {
        console.log("--", dynamicName)
        urls.push(`/${dynamicName}`)
        urls.push(`/${enLocale}/${dynamicName}`)
      })
    } else {
      console.log("-", name)
      if (name === "home") {
        urls.push("/")
        urls.push(`/${enLocale}`)
      } else {
        urls.push(`/${name}`)
        urls.push(`/${enLocale}/${name}`)
      }
    }
  }

  fs.readdirSync("./src/views/" + STATUS_PAGES_NAME, {
    withFileTypes: true,
    recursive: false,
  }).forEach((file) => {
    if (!file.isFile()) {
      return
    }

    const name = getStatusUrlName(file.name)
    console.log("-", name)

    urls.push(`/${name}`)
  })

  return urls
}

function initDirectories() {
  console.log("Init directories...")

  const basePath = "./dist/static/"
  const directories = [enLocale, "islands", enLocale + "/islands", "news", enLocale + "/news"]

  directories.forEach((path) => {
    console.log("- ", path)
    const directory = basePath + path
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory)
    }
  })
}

async function getDynamicNames(name: string): Promise<Array<string>> {
  console.log("getDynamicNames, name", name)

  return []
}

function getStatusUrlName(fileName: string): string | null {
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

function getUrlName(fileName: string): string | null {
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

function camelToKebab(text: string): string {
  return text
    .split("")
    .map((letter, i) => {
      return letter.toUpperCase() === letter
        ? `${i !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter
    })
    .join("")
}
