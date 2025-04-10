<script setup>
import PlanBlock from "@/views/PlanBlock.vue"

const projectWebsiteUrl = import.meta.env.VITE_PROJECT_WEBSITE_URL
</script>

<template>
  <main class="content container container-text">
    <h1>О проекте</h1>
    <div class="fw-bold">Зачем?</div>
    <blockquote class="blockquote">
      <p>
        Все основные приложения для учета тренировок ушли из России, аналоги не понравились. Решил
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
  </main>
</template>
