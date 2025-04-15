<script setup>
import HomeMain from "./home/HomeMain.vue"
import HomeImages from "./home/HomeImages.vue"
import PlanBlock from "./PlanBlock.vue"
import { useSSRContext } from "vue"
import { DEFAULT_KEYWORDS, setMetaInfo } from "@/utils/page-meta"

const ssrContext = import.meta.env.SSR ? useSSRContext() : null
setMetaInfo(
  {
    title:
      "Мобильное приложение для учёта тренировок. Статистика, графики, импорт и экспорт, редактирование маршрута",
    description:
      "Простое мобильное приложение для учёта тренировок. Краткая и полная статистика, графики, импорт и экспорт, простое редактирование маршрута.",
    keywords: "мобильное приложение, учёт тренировок, " + DEFAULT_KEYWORDS,
  },
  ssrContext,
)
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
