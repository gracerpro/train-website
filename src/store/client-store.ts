import { defineStore } from "pinia"
import { ref } from "vue"

const storeName = "mobileClient"
const NAME_VERSION = storeName + ".version"

let initVersion: string | null = null

if (!import.meta.env.SSR) {
  initVersion = localStorage.getItem(NAME_VERSION)
}

export const useMobileClientStore = defineStore(storeName, () => {
  const version = ref<string>(
    initVersion !== null ? initVersion : import.meta.env.VITE_MOBILE_APP_VERSION,
  )

  function setVersion(value: string) {
    version.value = value
    localStorage.setItem(NAME_VERSION, value)
  }

  return { version, setVersion }
})
