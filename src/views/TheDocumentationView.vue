<script setup>
import { DEFAULT_KEYWORDS, setMetaInfo } from "@/utils/page-meta"
import { useSSRContext } from "vue"

const ssrContext = import.meta.env.SSR ? useSSRContext() : null
setMetaInfo(
  {
    title: "Документация",
    description: "Документация",
    keywords: "документация, " + DEFAULT_KEYWORDS,
  },
  ssrContext,
)
</script>

<template>
  <main class="content container container-text">
    <h1>Документация</h1>

    <p>На этой странице будет лежать документация для пользователей и разработчиков, временно.</p>

    <ul class="mb-3">
      <li>
        <a href="#how-to-update">Как обновить приложение?</a>
      </li>
      <li>
        <a href="#how-to-import-from-strava">Как импортировать тренировки из <b>Strava?</b></a>
      </li>
      <li>
        <a href="#how-to-import-from-adidas-runing"
          >Как импортировать тренировки из <b>Adidas running?</b></a
        >
      </li>
    </ul>

    <h3 id="how-to-update">Как обновить приложение?</h3>
    <p>
      Пока только вручную. Нужно
      <router-link :to="{ name: 'download' }">скачать apk-файл</router-link>
      себе на устройство. Запустить его, выполнится проверка и установка приложения. В будущем
      приложение появится в магазинах.
    </p>

    <h3 id="how-to-import-from-strava">Как импортировать тренировки из Strava?</h3>
    <div class="mb-3">
      <span class="badge text-bg-warning">путь не для ленивых</span>
      <span class="badge text-bg-danger ms-2">разработка</span>
    </div>
    <ol>
      <li>
        В web версии <a href="https://www.strava.com" target="_blank">Strava</a> нужно запустить
        выгрузку тренировок из личного кабинета.
      </li>
      <li>Дождаться выгрузки, она может идти до нескольких дней.</li>
      <li>
        Выгруженный архив прогнать через
        <b
          ><a href="https://github.com/gracerpro/convert-sport-activity" target="_blank"
            >конвертер тренировок</a
          ></b
        >. Web интерфейса нет потому что этот сервер не раполагает большим количеством дисковой и
        оперативной памяти, а что бы распарсить архив нужно немало памяти.
      </li>
      <li>Конвертер сгенерирует архив, который можно загружать в мобильное приложение.</li>
    </ol>

    <h3 id="how-to-import-from-adidas-runing">Как импортировать тренировки из Adidas running?</h3>
    <div class="mb-3">
      <span class="badge text-bg-warning">путь не для ленивых</span>
      <span class="badge text-bg-danger ms-2">разработка</span>
    </div>
    <ol>
      <li>
        В web версии <a href="https://www.runtastic.com/" target="_blank">Adidas running</a> нужно
        запустить выгрузку тренировок из личного кабинета.
      </li>
      <li>Дождаться выгрузки, она может идти до нескольких дней.</li>
      <li>
        Выгруженный архив прогнать через
        <b
          ><a href="https://github.com/gracerpro/convert-sport-activity" target="_blank"
            >конвертер тренировок</a
          ></b
        >. Web интерфейса нет потому что этот сервер не раполагает большим количеством дисковой и
        оперативной памяти, а что бы распарсить архив нужно немало памяти.
      </li>
      <li>Конвертер сгенерирует архив, который можно загружать в мобильное приложение.</li>
    </ol>
  </main>
</template>
