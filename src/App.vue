<script setup>
import { RouterView } from "vue-router"
import TheNav from "./views/TheNav.vue"

const currentYear = new Date().getFullYear()
</script>

<template>
  <the-nav />
  <RouterView />

  <footer class="my-4 text-center">
    <div class="container">Copyright &copy; Vyacheslav 2024-{{ currentYear }}</div>
  </footer>
</template>
