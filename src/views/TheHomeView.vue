<script setup>
import HomeMain from "./home/HomeMain.vue"
import HomeImages from "./home/HomeImages.vue"
import PlanBlock from "./PlanBlock.vue"
</script>

<template>
  <main class="container container-text">
    <home-main />
    <plan-block />
    <home-images />
    <p class="mt-4">
      Скачать приложение можно
      <router-link :to="{ name: 'download' }">здесь</router-link>
    </p>
  </main>
</template>
