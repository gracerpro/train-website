<script setup lang="ts">
import { marked } from "marked"

import { ReleaseApi, type Release } from "@/api/ReleaseApi"
import { computed, ref, useSSRContext } from "vue"
import LoadingRow from "@/components/LoadingRow.vue"
import { formatDate } from "@/utils/date-time"
import { DEFAULT_KEYWORDS, setMetaInfo } from "@/utils/page-meta"

const releaseApi = new ReleaseApi()

const errorMessage = ref("")
const latestReleaseLoading = ref(true)
const latestRelease = ref<Release | null>(null)
const rustoreUrl = import.meta.env.VITE_RUSTORE_URL

const descriptionHtml = computed(() => {
  if (!latestRelease.value?.descriptionMarkdown) {
    return ""
  }
  return marked.parse(latestRelease.value.descriptionMarkdown)
})

const ssrContext = import.meta.env.SSR ? useSSRContext() : null
setMetaInfo(
  {
    title: "Скачать",
    description: "Скачать",
    keywords: "скачать, " + DEFAULT_KEYWORDS,
  },
  ssrContext,
)

if (!import.meta.env.SSR) {
  load()
}

function load() {
  errorMessage.value = ""
  latestReleaseLoading.value = true

  releaseApi
    .getLatest()
    .then((release) => {
      latestRelease.value = release
    })
    .catch((e) => {
      console.error(e)
      errorMessage.value = "Не удалось найти последний релиз."
    })
    .finally(() => (latestReleaseLoading.value = false))
}
</script>

<template>
  <main class="content container container-text">
    <h1>Скачать</h1>
    <p>
      На этой странице можно скачать последнюю версию приложения. Другие версии можно найти на
      странице с
      <router-link :to="{ name: 'history' }">историей</router-link>.
    </p>
    <p>
      Так же последнюю версию можно загрузить в магазине
      <a :href="rustoreUrl" target="_blank">RuStore</a>
    </p>

    <div v-if="errorMessage.length" class="alert alert-danger">{{ errorMessage }}</div>
    <loading-row v-else-if="latestReleaseLoading" />
    <div v-else-if="!latestRelease" class="alert alert-warning">Не найден последний релиз.</div>
    <div v-else>
      <h4>{{ latestRelease.versionName }}</h4>
      <div class="fst-italic mb-3">
        {{ latestRelease.releasedAt ? formatDate(latestRelease.releasedAt) : "&mdash;" }}
      </div>

      <div
        v-if="latestRelease.snippetMarkdown"
        class="mb-3"
        v-html="marked.parse(latestRelease.snippetMarkdown)"
      ></div>

      <div v-if="!latestRelease.downloadUrl">
        <div v-if="!latestRelease.downloadPageUrl" class="alert alert-warning">
          Релиз в процессе сборки. Ссылка появится позже.
        </div>
        <a v-else :href="latestRelease.downloadPageUrl" target="_blank" class="btn btn-primary"
          >Перейти к скачиванию</a
        >
      </div>
      <a v-else :href="latestRelease.downloadUrl" class="btn btn-primary">Скачать</a>

      <div class="mt-3" v-html="descriptionHtml"></div>
    </div>
  </main>
</template>
