<script setup>
import PlanBlock from "@/views/PlanBlock.vue"
</script>

<template>
  <main class="container">
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
  </main>
</template>
