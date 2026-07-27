<script setup lang="ts">
import { setTheme } from "@/core/theme"
import { useThemeStore } from "@/store/theme"
import { computed } from "vue"

const theme = useThemeStore()

const isDark = computed({
  get: () => theme.isDark,
  set: (newValue) => theme.setIsDark(newValue),
})

function onChange() {
  setTheme(isDark.value)
}
</script>

<template>
  <div class="form-check form-switch">
    <input v-model="isDark" class="form-check-input" type="checkbox" @change="onChange" />
  </div>
</template>
