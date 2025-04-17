<script setup>
import { RouterView } from "vue-router"
import TheNav from "./views/TheNav.vue"
import TheFooter from "./views/TheFooter.vue"
import { ref } from "vue"
import { useThemeStore } from "./store/theme"
import { setTheme } from "./core/theme"
import LoadingRow from "@/components/LoadingRow.vue"

const isLoading = ref(false)

if (!import.meta.env.SSR) {
  isLoading.value = true

  const theme = useThemeStore()
  setTheme(theme.isDark)

  isLoading.value = false
}
</script>

<template>
  <loading-row v-if="isLoading" />
  <template v-else>
    <the-nav />
    <router-view />
    <the-footer />
  </template>
</template>
