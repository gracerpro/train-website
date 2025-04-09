<script setup>
import { ReleaseApi } from "@/api/ReleaseApi"
import { ref } from "vue"
import LoadingRow from "@/components/LoadingRow.vue"
import { formatDate } from "@/utils/DateTime"

const client = new ReleaseApi()

const errorMessage = ref("")
const latestReleaseLoading = ref(true)
const latestRelease = ref(null)

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
      errorMessage.value = "Не удалось найти ссылку на последний релиз."
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

    <div v-if="errorMessage.length" class="alert alert-danger">{{ errorMessage }}</div>
    <loading-row v-else-if="latestReleaseLoading" />
    <div v-else-if="!latestRelease" class="alert alert-warning">Не найден последний релиз.</div>
    <div v-else-if="!latestRelease.downloadUrl" class="alert alert-warning">
      Не удалось найти ссылку на последний релиз.
    </div>
    <div v-else>
      <h4>{{ latestRelease.versionLabel }}</h4>
      <div class="fst-italic mb-3">{{ formatDate(latestRelease.date) }}</div>
      <div>
        <a :href="latestRelease.downloadUrl" class="btn btn-primary">Скачать</a>
      </div>
    </div>
  </main>
</template>
