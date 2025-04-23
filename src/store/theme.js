/* global localStorage */

import { defineStore } from "pinia"
import { ref } from "vue"

const NAME_IS_DARK = "theme.isDark"

let initIsDark = false

if (!import.meta.env.SSR) {
  initIsDark = localStorage.getItem(NAME_IS_DARK) === "1"
}

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(initIsDark)

  function setIsDark(value) {
    isDark.value = value
    localStorage.setItem(NAME_IS_DARK, isDark.value ? "1" : "0")
  }

  return { isDark, setIsDark }
})
