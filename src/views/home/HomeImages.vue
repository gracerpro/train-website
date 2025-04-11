<script setup>
import {
  V_1_0_17_ACTIVITY_1,
  V_1_0_17_ACTIVITY_2,
  V_1_0_17_ACTIVITY_3,
  V_1_0_17_ACTIVITY_LIST,
  V_1_0_17_PROFILE,
  V_1_0_17_SETTINGS,
  V_1_0_17_START_ACTIVITY,
  V_1_2_9_EXPORT,
  V_1_2_9_MONTH_STATISTICS,
  V_1_2_9_MONTH_STATISTICS_FILTER,
  V_1_2_9_STATISTICS,
} from "@/api/ScreenshotApi"

const images = [
  {
    url: V_1_0_17_START_ACTIVITY,
    name: "Выбор тренировки",
  },
  {
    url: V_1_0_17_ACTIVITY_1,
    name: "Тренировка 1",
  },
  {
    url: V_1_0_17_ACTIVITY_2,
    name: "Тренировка 2",
  },
  {
    url: V_1_0_17_ACTIVITY_3,
    name: "Тренировка 3",
  },
  {
    url: V_1_0_17_SETTINGS,
    name: "Настройки",
  },
  {
    url: V_1_0_17_PROFILE,
    name: "Профиль",
  },
  {
    url: V_1_0_17_ACTIVITY_LIST,
    name: "Список тренировок",
  },
  {
    url: V_1_2_9_STATISTICS,
    name: "Статистика",
  },
  {
    url: V_1_2_9_MONTH_STATISTICS,
    name: "Статистика за месяц",
  },
  {
    url: V_1_2_9_MONTH_STATISTICS_FILTER,
    name: "Статистика за месяц с фильтром",
  },
  {
    url: V_1_2_9_EXPORT,
    name: "Экспорт",
  },
]
</script>

<template>
  <div>
    <h2>Скриншоты</h2>
    <div class="image-row">
      <div v-for="image in images" :key="image.url" class="image-item">
        <img :src="image.url" :alt="image.name" />
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
