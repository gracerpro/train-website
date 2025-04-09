<script setup>
import { ReleaseApi } from "@/api/ReleaseApi"
import { ref } from "vue"
import { formatDate } from "@/utils/DateTime"

const client = new ReleaseApi()

const releasesErrorMessage = ref("")
const releases = ref([])

load()

function load() {
  releasesErrorMessage.value = ""

  client
    .getList()
    .then((response) => {
      const list = response.items
      list.sort((a, b) => {
        return a.date < b.date
      })
      releases.value = list
    })
    .catch((e) => {
      console.error(e)
      releasesErrorMessage.value = "Произошла внутренняя ошибка."
    })
}
</script>

<template>
  <main class="content container container-text">
    <h1>История</h1>

    <div v-if="releasesErrorMessage.length" class="alert alert-danger">
      {{ releasesErrorMessage }}
    </div>
    <div v-else-if="releases.length === 0" class="alert alert-info">Список пуст.</div>
    <div v-for="release in releases" :key="release.versionCode">
      <h2>{{ release.versionLabel }}</h2>
      <p>
        <span class="fst-italic">{{ formatDate(release.date) }}</span>
        <span v-if="release.downloadUrl" class="d-inline-block ms-3">
          <a :href="release.downloadUrl">Скачать</a>
        </span>
      </p>
      <div v-html="release.description"></div>
    </div>
  </main>
</template>
