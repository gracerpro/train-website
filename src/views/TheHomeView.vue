<script setup lang="ts">
import HomeImages from "./home/HomeImages.vue"
import PlanBlock from "./PlanBlock.vue"
import { useSSRContext } from "vue"
import { DEFAULT_KEYWORDS, setMetaInfo } from "@/utils/page-meta"
import HomeMainImages from "./home/HomeMainImages.vue"
import HomeDescriptions from "./home/HomeDescriptions.vue"

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
  <main>
    <div class="container">
      <h1>Мобильное приложение для учёта тренировок</h1>

      <div class="row">
        <div class="col-sm-5 mb-3">
          <home-descriptions />
        </div>
        <div class="col-sm-7 mb-3">
          <home-main-images />
        </div>
      </div>
    </div>

    <div class="container container-text">
      <plan-block />
      <home-images />
      <p class="mt-4">
        Скачать приложение можно
        <router-link :to="{ name: 'download' }">здесь</router-link>
      </p>
    </div>
  </main>
</template>
