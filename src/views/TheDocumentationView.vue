<script setup>
import {
  URL_SET_PERMISSIONS_ABOUT,
  URL_SET_PERMISSIONS_ALLOW_GPS,
  URL_SET_PERMISSIONS_APPLICATIONS,
  URL_SET_PERMISSIONS_APPLICATIONS_APPLICATIONS,
  URL_SET_PERMISSIONS_GPS,
  URL_SET_PERMISSIONS_NOTIFICATIONS,
  URL_SET_PERMISSIONS_SETTINGS,
} from "@/api/ScreenshotApi"
import { DEFAULT_KEYWORDS, setMetaInfo } from "@/utils/page-meta"
import { useSSRContext } from "vue"

const rustoreUrl = import.meta.env.VITE_RUSTORE_URL
const ssrContext = import.meta.env.SSR ? useSSRContext() : null
const appName = import.meta.env.VITE_APP_NAME

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
        <a href="#how-to-install">Как установить приложение?</a>
      </li>
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

    <h3 id="how-to-install">Как установить приложение?</h3>
    <p>
      С помощью магазина
      <a :href="rustoreUrl" target="_blank">RuStore</a>. При первом запуске нужно дать права или
      разрешения на определение местоположения, выбрав <i>Разрешить в любом режиме</i>.
    </p>
    <p>Если права пропали или их случайно отозвали то</p>

    <p>Android 10</p>

    <div class="row">
      <div class="col-lg-5">
        <ul>
          <li>Нужно перейти в <i>Настройки</i></li>
          <li>Выбрать <i>Приложения</i></li>
          <li>Выбрать <i>Приложения</i></li>
          <li>
            Найти <i>{{ appName }}</i
            >, выбрать его
          </li>
          <li>
            Выбрать <i>Права</i>
            <ul>
              <li>Выбрать <i>Геоданные</i></li>
              <li>Выбрать <i>Разрешить в любом режиме</i></li>
            </ul>
          </li>
          <li>
            Выбрать <i>Уведомления</i>
            <ul>
              <li>Выбрать <i>Разрешить уведомления</i></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="col-lg-7">
        <img :src="URL_SET_PERMISSIONS_SETTINGS" />
        <img :src="URL_SET_PERMISSIONS_APPLICATIONS" />
        <img :src="URL_SET_PERMISSIONS_APPLICATIONS_APPLICATIONS" />
        <img :src="URL_SET_PERMISSIONS_ABOUT" />
        <img :src="URL_SET_PERMISSIONS_GPS" />
        <img :src="URL_SET_PERMISSIONS_ALLOW_GPS" />
        <img :src="URL_SET_PERMISSIONS_NOTIFICATIONS" />
      </div>
    </div>

    <h3 id="how-to-update">Как обновить приложение?</h3>
    <p>
      С помощью магазина
      <a :href="rustoreUrl" target="_blank">RuStore</a>. Когда выйдет новая версия магазин пришлёт
      уведомление.
    </p>
    <p>
      Или вручную,
      <router-link :to="{ name: 'download' }">скачав apk-файл</router-link>
      себе на устройство. Запустить его, выполнится проверка и установка приложения.
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
