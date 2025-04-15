<script setup>
import { setMetaInfo } from "@/utils/page-meta"
import { useSSRContext } from "vue"

const title = "Страница не найдена"
const ssrContext = import.meta.env.SSR ? useSSRContext() : null

setMetaInfo(
  {
    title,
    description: title,
    keywords: `404, ${title}`,
  },
  ssrContext,
)
</script>

<template>
  <div class="container container-text">
    <h1>404 Страница не найдена</h1>
    <p>Возможно, страница была перемещена.</p>
    <p>
      <a href="/">Перейти на главную</a>
    </p>
  </div>
</template>
