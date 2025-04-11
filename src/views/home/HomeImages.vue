<script setup>
import {
  URL_1_4_2_ACTIVITING,
  V_1_4_2_ABOUT,
  V_1_4_2_ACTIVITING_BEFORE,
  V_1_4_2_ACTIVITY_CARD,
  V_1_4_2_ACTIVITY_GRAPHIC,
  V_1_4_2_ACTIVITY_LIST,
  V_1_4_2_ACTIVITY_TABLE,
  V_1_4_2_ACTIVITY_TYPES,
  V_1_4_2_ADD_ACTIVITY,
  V_1_4_2_EDIT_ACTIVITY_DIALOG,
  V_1_4_2_EDIT_ROUTE,
  V_1_4_2_EXPORT,
  V_1_4_2_IMPORT,
  V_1_4_2_MONTH_STATISTICS,
  V_1_4_2_PROFILE,
  V_1_4_2_SETTINGS,
  V_1_4_2_STATISTICS,
} from "@/api/ScreenshotApi"

const images = [
  {
    url: V_1_4_2_ACTIVITING_BEFORE,
    name: "Начало тренировки",
  },
  {
    url: URL_1_4_2_ACTIVITING,
    name: "Запись тренировки",
  },
  {
    url: V_1_4_2_ACTIVITY_LIST,
    name: "Список тренировок",
  },
  {
    url: V_1_4_2_ACTIVITY_CARD,
    name: "Карточка тренировки",
  },
  {
    url: V_1_4_2_EDIT_ACTIVITY_DIALOG,
    name: "Редактирование тренировки",
  },
  {
    url: V_1_4_2_ACTIVITY_GRAPHIC,
    name: "График скорости",
  },
  {
    url: V_1_4_2_ACTIVITY_TABLE,
    name: "Таблица координат маршрута",
  },
  {
    url: V_1_4_2_EDIT_ROUTE,
    name: "Редактирование маршрута",
  },
  {
    url: V_1_4_2_ACTIVITY_TYPES,
    name: "Типы тренировок",
  },
  {
    url: V_1_4_2_ADD_ACTIVITY,
    name: "Добавление тренировки",
  },
  {
    url: V_1_4_2_SETTINGS,
    name: "Настройки",
  },
  {
    url: V_1_4_2_PROFILE,
    name: "Профиль",
  },
  {
    url: V_1_4_2_STATISTICS,
    name: "Статистика",
  },
  {
    url: V_1_4_2_MONTH_STATISTICS,
    name: "Статистика за месяц",
  },
  {
    url: V_1_4_2_IMPORT,
    name: "Импорт",
  },
  {
    url: V_1_4_2_EXPORT,
    name: "Экспорт",
  },
  {
    url: V_1_4_2_ABOUT,
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
.image-item {
  width: 250px;
  height: 510px;
  padding: 5px;
  margin: 10px;
  text-align: center;
  outline: 1px solid #ddd;
  border-radius: 5px;
}
.image-item:hover {
  outline: 3px solid #ddd;
}
.image-item img {
  width: 234px;
  height: 500px;
}
</style>
