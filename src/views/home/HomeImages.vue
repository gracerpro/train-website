<script setup lang="ts">
import {
  URL_ACTIVITY_CARD,
  URL_1_4_2_ACTIVITING_BEFORE,
  URL_ACTIVITING,
  URL_ACTIVITY_DETAIL_GRAPHIC,
  URL_ACTIVITY_DETAIL_SEGMENTS,
  URL_ACTIVITY_LIST,
  URL_ACTIVITY_DETAIL_TABLE,
  URL_ACTIVITY_TYPES,
  URL_ADD_ACTIVITY,
  URL_EDIT_ACTIVITY_DIALOG,
  URL_EDIT_ROUTE,
  URL_EXPORT,
  URL_IMPORT,
  URL_STATISTICS_SHORT,
  URL_STATISTICS,
  URL_MONTH_STATISTICS,
  URL_PROFILE,
  URL_SETTINGS,
  URL_1_4_2_RESTORE,
  URL_ABOUT,
  getImage,
  type ImagesKey,
  URL_ACTIVITY_CARD_NO_NAME,
} from "@/api/ScreenshotApi"

const images: ImagesKey[] = [
  URL_1_4_2_ACTIVITING_BEFORE,
  URL_ACTIVITING,
  URL_1_4_2_RESTORE,
  URL_STATISTICS_SHORT,
  URL_STATISTICS,
  URL_MONTH_STATISTICS,
  URL_ACTIVITY_LIST,
  URL_ACTIVITY_CARD,
  URL_ACTIVITY_CARD_NO_NAME,
  URL_EDIT_ACTIVITY_DIALOG,
  URL_ACTIVITY_DETAIL_GRAPHIC,
  URL_ACTIVITY_DETAIL_SEGMENTS,
  URL_ACTIVITY_DETAIL_TABLE,
  URL_EDIT_ROUTE,
  URL_ACTIVITY_TYPES,
  URL_ADD_ACTIVITY,
  URL_SETTINGS,
  URL_PROFILE,
  URL_IMPORT,
  URL_EXPORT,
  URL_ABOUT,
]

const homeImages = images.map((name) => getImage(name))
</script>

<template>
  <div>
    <h2>Скриншоты</h2>

    <div class="image-row">
      <div v-for="image in homeImages" :key="image.url" class="card image-card">
        <div class="image-card-row">
          <img
            class="image-item"
            :src="image.url"
            :alt="image.alt"
            :width="image.width"
            :height="image.height"
            :title="image.alt"
          />
        </div>
        <div class="card-body text-center">{{ image.alt }}</div>
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
