<script setup>
import { V_1_4_2_START } from "@/api/ScreenshotApi"

const screens = [
  { name: "Главный, начало тренировки" },
  { name: "Тренировка, запись маршрута" },
  { name: "Просмотр тренировки, детали, графики" },
  { name: "Список тренировок" },
  { name: "Экспорт тренировок" },
  { name: "Импорт тренировок" },
  { name: "Импорт тренировки вручную" },
  { name: "Статистика" },
  { name: "Статистика за месяц" },
  { name: "Настройки" },
  { name: "Типы тренировок" },
  { name: "Профиль пользователя" },
  { name: "О приложении" },
]
</script>

<template>
  <div>
    <h1>Мобильное приложение для учёта тренировок</h1>

    <div class="row">
      <div class="col-sm-7">
        <p>
          Приложение представляет собой <b>GPS трекер</b>, поэтому может использоваться для
          различных тренировок: бег, ходьба, езда на велосипеде и т. д. Хранит все тренирови на
          мобильном устройстве. Не требует интернет.
        </p>
        <p>Приложение разделено на экраны, всего {{ screens.length }} шт.</p>
        <ol>
          <li v-for="(screen, i) in screens" :key="i">{{ screen.name }}</li>
        </ol>
      </div>
      <div class="col-sm-5">
        <div class="text-center">
          <img :src="V_1_4_2_START" class="main-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.main-image {
  max-width: 240px;
}
</style>
