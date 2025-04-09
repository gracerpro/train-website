<script setup>
import { ref } from "vue"

const questions = ref([])
</script>

<template>
  <main class="content container">
    <h1>Часто задаваемые вопросы</h1>
    <div v-if="questions.length === 0" class="alert alert-info">Список пуст.</div>
    <div v-else>
      <div v-for="(question, index) in questions" :key="question.id">
        <div class="mb-2">{{ index + 1 + ". " + question.name }}</div>
        <div>{{ question.answer }}</div>
      </div>
    </div>
  </main>
</template>
