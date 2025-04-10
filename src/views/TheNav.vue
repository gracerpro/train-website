<script setup>
import { Collapse } from "bootstrap"
import { onMounted, ref } from "vue"

const togglerButton = ref(null)

onMounted(() => {
  new Collapse(togglerButton.value)
})
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container container-text">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          ref="togglerButton"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <router-link :to="{ name: 'home' }" class="navbar-brand">
            <img src="/favicon.svg" alt="Главная" width="24" height="24" />
          </router-link>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'download' }" class="nav-link">Скачать</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'history' }" class="nav-link">История</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'documentation' }" class="nav-link"
                >Документация</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'contact' }" class="nav-link">Контакты</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'about' }" class="nav-link">О проекте</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@media (max-width: 991px) {
  .navbar-brand img {
    margin-top: 16px;
    margin-bottom: 8px;
  }
}
</style>
