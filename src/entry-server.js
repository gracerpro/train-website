import { basename } from "node:path"
import { renderToString } from "vue/server-renderer"
import { createApp } from "./main"

/**
 * @param {string} url
 * @param {Object} ssrManifest
 */
export async function render(url, ssrManifest) {
  const { app, router } = createApp()

  // set the router to the desired URL before rendering
  await router.push(url)
  await router.isReady()

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on context.modules. After the render, context.modules would contain all the
  // components that have been instantiated during this render call.
  const context = {
    url,
  }

  const html = await renderToString(app, context)

  return {
    html,
    preloadLinks: ssrManifest ? renderPreloadLinks(context.modules, ssrManifest) : "",
  }
}

/**
 *
 * @param {Array} modules
 * @param {Object} manifest
 * @returns {String}
 */
function renderPreloadLinks(modules, manifest) {
  let links = ""
  const set = new Set()

  modules.forEach((id) => {
    const files = manifest[id]

    if (files) {
      files.forEach((file) => {
        if (!set.has(file)) {
          set.add(file)

          const fileName = basename(file)
          if (manifest[fileName]) {
            for (const manifestFile of manifest[fileName]) {
              links += renderPreloadLink(manifestFile)
              set.add(manifestFile)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })

  return links
}

const linkActions = {
  js: (file) => `<link rel="modulepreload" crossorigin href="${file}">`,
  css: (file) => `<link rel="stylesheet" href="${file}">`,
  woff: (file) => `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`,
  woff2: (file) => `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`,
  gif: (file) => `<link rel="preload" href="${file}" as="image" type="image/gif">`,
  jpeg: (file) => `<link rel="preload" href="${file}" as="image" type="image/jpeg">`,
  jpg: (file) => `<link rel="preload" href="${file}" as="image" type="image/jpeg">`,
  png: (file) => `<link rel="preload" href="${file}" as="image" type="image/png">`,
}

/**
 * @param {String} file
 * @returns {String}
 */
function renderPreloadLink(file) {
  const dotPos = file.lastIndexOf(".")

  if (dotPos < 0) {
    return ""
  }

  const extension = file.substring(dotPos + 1)

  return linkActions[extension] ? linkActions[extension](file) : ""
}
