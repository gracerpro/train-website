import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import compression from "vite-plugin-compression2"

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8101,
    strictPort: true,
  },
  plugins: [
    vue(),
    vueDevTools(),
    compression({
      algorithm: "gzip",
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
  ],
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler", // or "modern", "legacy"
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
