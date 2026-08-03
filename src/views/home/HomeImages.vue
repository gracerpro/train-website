<script setup lang="ts">
import {
  URL_1_4_2_ACTIVITING,
  URL_1_4_2_STATISTICS_SHORT,
  URL_1_4_2_ABOUT,
  URL_1_4_2_ACTIVITING_BEFORE,
  URL_1_4_2_ACTIVITY_CARD,
  URL_1_4_2_ACTIVITY_GRAPHIC,
  URL_1_4_2_ACTIVITY_LIST,
  URL_1_4_2_ACTIVITY_TABLE,
  URL_1_4_2_ACTIVITY_TYPES,
  URL_1_4_2_ADD_ACTIVITY,
  URL_1_4_2_EDIT_ACTIVITY_DIALOG,
  URL_1_4_2_EDIT_ROUTE,
  URL_1_4_2_EXPORT,
  URL_1_4_2_IMPORT,
  URL_1_4_2_MONTH_STATISTICS,
  URL_1_4_2_PROFILE,
  URL_1_4_2_SETTINGS,
  URL_1_4_2_STATISTICS,
  URL_1_4_2_RESTORE,
  getImage,
  type ImagesKey,
} from "@/api/ScreenshotApi"

const images: ImagesKey[] = [
  URL_1_4_2_ACTIVITING,
  URL_1_4_2_RESTORE,
  URL_1_4_2_ACTIVITING_BEFORE,
  URL_1_4_2_STATISTICS_SHORT,
  URL_1_4_2_RESTORE,
  URL_1_4_2_ACTIVITY_LIST,
  URL_1_4_2_ACTIVITY_CARD,
  URL_1_4_2_EDIT_ACTIVITY_DIALOG,
  URL_1_4_2_ACTIVITY_GRAPHIC,
  URL_1_4_2_ACTIVITY_TABLE,
  URL_1_4_2_EDIT_ROUTE,
  URL_1_4_2_ACTIVITY_TYPES,
  URL_1_4_2_ADD_ACTIVITY,
  URL_1_4_2_SETTINGS,
  URL_1_4_2_STATISTICS,
  URL_1_4_2_MONTH_STATISTICS,
  URL_1_4_2_PROFILE,
  URL_1_4_2_IMPORT,
  URL_1_4_2_EXPORT,
  URL_1_4_2_ABOUT,
]

const homeImages = images.map((name) => getImage(name))
</script>

<template>
  <div>
    <h2>Скриншоты</h2>
    <div class="image-row">
      <div v-for="image in homeImages" :key="image.url" class="image-item">
        <img :src="image.url" :alt="image.alt" :title="image.alt" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
