<script setup>
const images = [
  {
    url: "https://i.postimg.cc/44LFFDtZ/image.png",
    name: "Выбор тренировки",
  },
  {
    url: "https://i.postimg.cc/QCy497sV/1.png",
    name: "Тренировка 1",
  },
  {
    url: "https://i.postimg.cc/8c5XzH2q/2.png",
    name: "Тренировка 2",
  },
  {
    url: "https://i.postimg.cc/50pkJGRB/3.png",
    name: "Тренировка 3",
  },
  {
    url: "https://i.postimg.cc/NMQPWYpG/image.png",
    name: "Настройки",
  },
  {
    url: "https://i.postimg.cc/8CR0Ksdn/image.png",
    name: "Профиль",
  },
  {
    url: "https://i.postimg.cc/VNQhWXtC/image.png",
    name: "Список тренировок",
  },
  {
    url: "https://i.postimg.cc/rwtb4fDT/image.png",
    name: "Статистика",
  },
  {
    url: "https://i.postimg.cc/Fs681MsG/image.png",
    name: "Статистика за месяц",
  },
  {
    url: "https://i.postimg.cc/KvjCGGFR/image.png",
    name: "Статистика за месяц с фильтром",
  },
  {
    url: "https://i.postimg.cc/jqZGYWpp/image.png",
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
