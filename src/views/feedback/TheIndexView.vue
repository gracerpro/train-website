<script setup lang="ts">
import { FeedbackApi, type Feedback } from "@/api/FeedbackApi"
import { UserError } from "@/exceptions/UserError"
import { formatDate } from "@/utils/date-time"
import { reactive, ref } from "vue"
import LoadingBox from "@/components/LoadingBox.vue"
import { marked } from "marked"

const feedbackApi = new FeedbackApi()

const isLoading = ref(false)
const errorMessage = ref("")
const feedbackItems = ref<Feedback[]>([])
const feedbackItemsTotalCount = ref(0)
const pagination = reactive({
  pageSize: 10,
  pageNumber: 1,
})

if (!import.meta.env.SSR) {
  load()
}

function load() {
  isLoading.value = true
  errorMessage.value = ""

  feedbackApi
    .getList(pagination.pageSize, pagination.pageNumber)
    .then((list) => {
      feedbackItems.value = list.items
      feedbackItemsTotalCount.value = list.totalCount

      if (feedbackItems.value.length === 0 && pagination.pageNumber > 1) {
        pagination.pageNumber = 1

        return load()
      }
    })
    .catch((error: Error) => {
      if (error instanceof UserError) {
        errorMessage.value = error.message
      } else {
        errorMessage.value = "Произошла внутренняя ошибка."
        throw error
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <main class="content container container-text">
    <h1>Обратная связь</h1>
    <div class="d-flex align-items-center gap-3 mb-3">
      <button class="btn btn-secondary" @click="load()">
        <i class="bi bi-arrow-clockwise"></i>
      </button>
      <loading-box :class="[isLoading ? 'visible' : 'invisible']" />
    </div>
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div>
      <div v-for="item in feedbackItems" :key="item.id" class="border rounded p-2 mb-3">
        <h3>{{ item.subject }}</h3>
        <div class="mb-3">
          <i>{{ formatDate(item.createdAt) }}</i>
          <span v-if="item.username">, {{ item.username }}</span>
        </div>
        <div v-html="marked.parse(item.messageMarkdown)" />

        <div v-if="item.answerMarkdown">
          <i class="text-danger-emphasis">Ответ администратора</i>
          <div v-html="marked.parse(item.answerMarkdown)" />
        </div>
      </div>
    </div>
  </main>
</template>
