import { createSSRApp } from "vue"

import App from "./App.vue"
import { router } from "./router"
import { createPinia } from "pinia"

export function createApp() {
  const app = createSSRApp(App)
  const store = createPinia()

  app.use(store).use(router)

  return {
    app,
    router,
    store,
  }
}
