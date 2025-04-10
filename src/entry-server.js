import { basename } from "node:path"
import { renderToString } from "vue/server-renderer"
import { createApp } from "./main"

/**
 * @param {string} _url
 */
export async function render(url, ssrManifest) {
  const { app } = createApp()

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
 * @returns
 */
function renderPreloadLinks(modules, manifest) {
  let links = ""
  const set = new Set()

  //console.log("modules", modules, "manifest", manifest)

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
          console.log(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })

  return links
}

/**
 * @param {String} file
 * @returns {String}
 */
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  }

  return ""
}
