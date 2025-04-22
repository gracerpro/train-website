<script setup>
/* jslint browser: true, devel: true */
/* global console */

import { ReleaseApi } from "@/api/ReleaseApi"
import { ref, useSSRContext } from "vue"
import LoadingRow from "@/components/LoadingRow.vue"
import { formatDate } from "@/utils/DateTime"
import { DEFAULT_KEYWORDS, setMetaInfo } from "@/utils/page-meta"

const client = new ReleaseApi()

const errorMessage = ref("")
const latestReleaseLoading = ref(true)
const latestRelease = ref(null)
const rustoreUrl = import.meta.env.VITE_RUSTORE_URL

const ssrContext = import.meta.env.SSR ? useSSRContext() : null
setMetaInfo(
  {
    title: "Скачать",
    description: "Скачать",
    keywords: "скачать, " + DEFAULT_KEYWORDS,
  },
  ssrContext,
)

load()

function load() {
  errorMessage.value = ""
  latestReleaseLoading.value = true

  client
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
      <h4>{{ latestRelease.versionLabel }}</h4>
      <div class="fst-italic mb-3">{{ formatDate(latestRelease.date) }}</div>
      <div v-if="!latestRelease.downloadUrl">
        <div v-if="!latestRelease.downloadPageUrl" class="alert alert-warning">
          Релиз в процессе сборки. Ссылка появится позже.
        </div>
        <a v-else :href="latestRelease.downloadUrl" target="_blank" class="btn btn-primary"
          >Перейти к скачиванию</a
        >
      </div>
      <a v-else :href="latestRelease.downloadUrl" class="btn btn-primary">Скачать</a>
      <div class="mt-3" v-html="latestRelease.description"></div>
    </div>
  </main>
</template>
