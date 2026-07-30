<script setup lang="ts">
import { ReleaseApi, type Release } from "@/api/ReleaseApi"
import { ref, useSSRContext } from "vue"
import { formatDate } from "@/utils/date-time"
import { getHumanSize } from "@/utils/formatter"
import { DEFAULT_KEYWORDS, setMetaInfo } from "@/utils/page-meta"
import { marked } from "marked"
import LoadingBox from "@/components/LoadingBox.vue"
import { UserError } from "@/exceptions/UserError"

const releaseApi = new ReleaseApi()

const isLoading = ref(false)
const errorMessage = ref("")
const releases = ref<Release[]>([])
const totalCount = ref(0)

const ssrContext = import.meta.env.SSR ? useSSRContext() : null
setMetaInfo(
  {
    title: "История изменений",
    description: "История изменений",
    keywords: "история изменений, " + DEFAULT_KEYWORDS,
  },
  ssrContext,
)

load()

function load() {
  isLoading.value = true
  errorMessage.value = ""

  releaseApi
    .getList(999)
    .then((list) => {
      releases.value = sortItems(list.items)
      totalCount.value = list.totalCount
    })
    .catch((error: Error) => {
      if (error instanceof UserError) {
        errorMessage.value = error.message
      } else {
        errorMessage.value = "Произошла внутренняя ошибка."
        throw error
      }
    })
    .finally(() => (isLoading.value = false))
}

function sortItems(list: Release[]): Release[] {
  list.sort((a, b) => {
    if (a.date === b.date || a.date === null || b.date === null) {
      return 0
    }
    return a.date < b.date ? -1 : 1
  })

  return list
}
</script>

<template>
  <main class="content container container-text">
    <h1>История</h1>
    <p>На странице выводится список релизов. Каждый релиз имеет версию, дату и описание.</p>

    <div class="d-flex align-items-center gap-3 mb-3">
      <button class="btn btn-link" :disabled="isLoading" @click="load()">
        <i class="bi bi-arrow-clockwise"></i>
      </button>
      <loading-box :class="[isLoading ? 'visible' : 'invisible']" />
    </div>

    <div v-if="errorMessage.length" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div v-if="!isLoading && releases.length === 0" class="alert alert-info">Список пуст.</div>

    <div v-for="(release, index) in releases" :key="release.versionCode">
      <h2>{{ release.versionLabel }}</h2>
      <p>
        <span class="fst-italic">{{ release.date ? formatDate(release.date) : "&mdash;" }}</span>
        <span v-if="!release.downloadUrl">
          <span v-if="!release.downloadPageUrl" class="d-inline-block ms-3 text-warning-emphasis">
            <span v-if="index === 0">Релиз в процессе сборки. Ссылка появится позже.</span>
          </span>
          <a
            v-else
            :href="release.downloadPageUrl"
            target="_blank"
            class="d-inline-block ms-3 link-primary"
            >Перейти к скачиванию</a
          >
        </span>
        <a v-else :href="release.downloadUrl" class="d-inline-block ms-3 link-primary">Скачать</a>

        <span v-if="release.fileSize > 0" class="d-inline-block ms-3">{{
          getHumanSize(release.fileSize)
        }}</span>
      </p>
      <div v-html="marked.parse(release.descriptionMarkdown)"></div>
    </div>
  </main>
</template>
