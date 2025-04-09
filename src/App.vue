<script setup>
import { RouterView } from "vue-router"
import TheNav from "./views/TheNav.vue"
import TheFooter from "./views/TheFooter.vue"
</script>

<template>
  <the-nav />
  <router-view />
  <the-footer />
</template>
