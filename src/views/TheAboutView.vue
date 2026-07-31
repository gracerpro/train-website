<script setup lang="ts">
import { formatDate } from "@/utils/date-time"
import { DEFAULT_KEYWORDS, setMetaInfo } from "@/utils/page-meta"
import PlanBlock from "@/views/PlanBlock.vue"
import { computed, useSSRContext } from "vue"

const projectWebsiteUrl = import.meta.env.VITE_PROJECT_WEBSITE_URL

const ssrContext = import.meta.env.SSR ? useSSRContext() : null
setMetaInfo(
  {
    title: "О проекте",
    description: "О проекте",
    keywords: "о проекте, " + DEFAULT_KEYWORDS,
  },
  ssrContext,
)
/*
Есть еще требования, которые не связаны с функциональностью, но которые не менее важны:
      отсутствие необходимости регистрации, и привязки аккаунтов бесплатность отсутствие рекламы
      отсутствие ненужных функций, которые уже есть или в телефоне, или в других приложениях, типа
      обмена сообщениями, тревожных кнопок, уведомлений, стираний данных, блокировок телефона, чата,
      и т.п.
      */
const LATEST_VERSION = import.meta.env.VITE_VERSION

const latestDate = computed(() => new Date(import.meta.env.VITE_VERSION_DATE))
</script>

<template>
  <main class="content container container-text">
    <h1>О проекте</h1>
    <div class="fw-bold">Зачем?</div>
    <blockquote class="blockquote">
      <p>
        Все основные приложения для учёта тренировок ушли из России, аналоги не понравились. Решил
        сделать новое мобильное приложение, было интересно изучить платформу Android и язык Kotlin.
      </p>
    </blockquote>
    <p>
      Мобильное приложение создано для учёта тренировок. Главный функционал GPS трекинга добавлен.
      Далее нужно расширять приложение.
    </p>

    <plan-block />

    <p class="mt-4">
      Код этого сайта открыт, кому интересно его можно посмотреть на
      <a :href="projectWebsiteUrl" target="_blank">GitHub</a>.
    </p>

    <p>
      Последняя версия мобильного приложения <b>{{ LATEST_VERSION }}</b> от
      <b>{{ formatDate(latestDate) }}</b>
    </p>
  </main>
</template>
