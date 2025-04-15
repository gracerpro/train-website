<script setup>
import { setMetaInfo } from "@/utils/page-meta"
import { useSSRContext } from "vue"

const title = "Возникла внутренняя ошибка"
const ssrContext = import.meta.env.SSR ? useSSRContext() : null

setMetaInfo(
  {
    title,
    description: title,
    keywords: `500, ${title}`,
  },
  ssrContext,
)
</script>

<template>
  <div class="container container-text">
    <h1>500 Возникла внутренняя ошибка</h1>
    <p>
      <a href="/">Перейти на главную</a>
    </p>
  </div>
</template>
