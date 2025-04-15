<script setup>
import { DEFAULT_KEYWORDS, setMetaInfo } from "@/utils/page-meta"
import { useSSRContext } from "vue"

const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
const projectWebsiteUrl = import.meta.env.VITE_PROJECT_WEBSITE_URL

const ssrContext = import.meta.env.SSR ? useSSRContext() : null
setMetaInfo(
  {
    title: "Контакты",
    description: "Контакты",
    keywords: "контакты, " + DEFAULT_KEYWORDS,
  },
  ssrContext,
)
</script>

<template>
  <main class="content container container-text">
    <h1>Контакты</h1>

    <p>
      Связаться с автором можно через <b>email</b>. В будущем планируется добавить форму обратной
      связи.
    </p>
    <div class="text-center">
      <a :href="'mailto:' + adminEmail" class="link-primary">{{ adminEmail }}</a>
    </div>

    <p class="mt-4">
      Так же, в основном для разработчиков, если вы имеете интересные идеи или вопросы, то на
      <a :href="projectWebsiteUrl" target="_blank">GitHub</a>
      можно открыть <i>Issue</i>. Спасибо!
    </p>
  </main>
</template>
