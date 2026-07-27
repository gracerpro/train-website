import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import compression from "vite-plugin-compression2"
import vueDevTools from "vite-plugin-vue-devtools"
import { readFileSync } from "node:fs"

// Read package.json to get the updated version
const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"))
const now = new Date()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: true,
    port: 8101,
    strictPort: true,
  },
  preview: {
    host: true,
    allowedHosts: true,
    port: 4101,
    strictPort: true,
  },
  plugins: [
    vue(),
    vueDevTools(),
    compression({
      algorithms: ["gzip"],
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    "import.meta.env.VITE_PACKAGE_VERSION": JSON.stringify(packageJson.version),
    "import.meta.env.VITE_PACKAGE_RELEASE_AT": JSON.stringify(
      now.getFullYear().toString() +
        "-" +
        (now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1)) +
        "-" +
        (now.getDate() > 9 ? now.getDate() : "0" + now.getDate()),
    ),
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "import", // Silence deprecation warnings related to @import rules
          "global-builtin",
          "color-functions",
          "if-function",
        ],
      },
    },
  },
})
