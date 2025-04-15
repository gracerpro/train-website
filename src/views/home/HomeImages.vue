<script setup>
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
} from "@/api/ScreenshotApi"

const images = [
  {
    url: URL_1_4_2_ACTIVITING_BEFORE,
    name: "Начало тренировки",
  },
  {
    url: URL_1_4_2_ACTIVITING,
    name: "Запись тренировки",
  },
  {
    url: URL_1_4_2_ACTIVITY_LIST,
    name: "Список тренировок",
  },
  {
    url: URL_1_4_2_ACTIVITY_CARD,
    name: "Карточка тренировки",
  },
  {
    url: URL_1_4_2_EDIT_ACTIVITY_DIALOG,
    name: "Редактирование тренировки",
  },
  {
    url: URL_1_4_2_ACTIVITY_GRAPHIC,
    name: "График скорости",
  },
  {
    url: URL_1_4_2_ACTIVITY_TABLE,
    name: "Таблица координат маршрута",
  },
  {
    url: URL_1_4_2_EDIT_ROUTE,
    name: "Редактирование маршрута",
  },
  {
    url: URL_1_4_2_ACTIVITY_TYPES,
    name: "Типы тренировок",
  },
  {
    url: URL_1_4_2_ADD_ACTIVITY,
    name: "Добавление тренировки",
  },
  {
    url: URL_1_4_2_SETTINGS,
    name: "Настройки",
  },
  {
    url: URL_1_4_2_PROFILE,
    name: "Профиль",
  },
  {
    url: URL_1_4_2_STATISTICS,
    name: "Статистика",
  },
  {
    url: URL_1_4_2_STATISTICS_SHORT,
    name: "Статистика по годам",
  },
  {
    url: URL_1_4_2_MONTH_STATISTICS,
    name: "Статистика за месяц",
  },
  {
    url: URL_1_4_2_IMPORT,
    name: "Импорт",
  },
  {
    url: URL_1_4_2_EXPORT,
    name: "Экспорт",
  },
  {
    url: URL_1_4_2_ABOUT,
    name: "О программе",
  },
]
</script>

<template>
  <div>
    <h2>Скриншоты</h2>
    <div class="image-row">
      <div v-for="image in images" :key="image.url" class="image-item">
        <img :src="image.url" :alt="image.name" :title="image.name" />
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
