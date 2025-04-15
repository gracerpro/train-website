<script setup>
import { DEFAULT_KEYWORDS, setMetaInfo } from "@/utils/page-meta"
import { ref, useSSRContext } from "vue"

const questions = ref([])

const ssrContext = import.meta.env.SSR ? useSSRContext() : null
setMetaInfo(
  {
    title: "Часто задаваемые вопросы",
    description: "Часто задаваемые вопросы",
    keywords: "часто задаваемые вопросы, " + DEFAULT_KEYWORDS,
  },
  ssrContext,
)
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
