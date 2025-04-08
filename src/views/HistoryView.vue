<script setup>
import { ReleaseApi } from "@/api/ReleaseApi"
import { ref } from "vue"

const client = new ReleaseApi()

const errorMessage = ref("")
const releases = ref([])

load()

function load() {
  errorMessage.value = ""
  client
    .getList()
    .then((response) => {
      releases.value = response.items
    })
    .catch((e) => {
      errorMessage.value = e.message
    })
}
</script>

<template>
  <main class="container">
    <h1>История</h1>

    <div v-if="releases.length === 0" class="">Список пуст.</div>
    <div v-for="release in releases" :key="release.versionCode">
      <h2>, versionCode =</h2>
      <div v-html="release.description"></div>
    </div>
  </main>
</template>

<style scoped>
.release-list {
}
</style>
