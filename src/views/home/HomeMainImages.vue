<script setup lang="ts">
import { getImage, URL_ACTIVITY_CARD_NO_NAME, URL_START } from "@/api/ScreenshotApi"

const mainScreenshot = getImage(URL_START)
const cardImage = getImage(URL_ACTIVITY_CARD_NO_NAME)
</script>

<template>
  <div>
    <div class="image-box mx-auto">
      <img
        :src="mainScreenshot.url"
        :height="mainScreenshot.height"
        :width="mainScreenshot.width"
        :alt="mainScreenshot.alt"
        class="main-image"
      />
      <img
        :src="cardImage.url"
        :height="cardImage.height"
        :width="cardImage.width"
        :alt="cardImage.alt"
        class="main-image"
      />
    </div>
  </div>
</template>

<style lang="css">
.main-image {
  outline: 1px solid #ddd;
  margin: 10px;
}
</style>
