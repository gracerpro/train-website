<script setup>
import { onMounted, ref } from "vue"
import { LATEST_VERSION } from "@/api/ReleaseApi"
import SwitchTheme from "@/components/SwitchTheme.vue"

const togglerButton = ref(null)

onMounted(() => {
  if (!import.meta.env.SSR) {
    import("bootstrap").then(({ Collapse }) => {
      new Collapse(togglerButton.value)
    })
  }
})
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
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
          <router-link :to="{ name: 'home' }" class="navbar-brand d-block">
            <img src="/favicon.svg" alt="Главная" width="24" height="24" />
            <span class="align-middle ms-2">{{ LATEST_VERSION }}</span>
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
              <router-link :to="{ name: 'user-agreement' }" class="nav-link"
                >Пользовательское соглашение</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'about' }" class="nav-link">О проекте</router-link>
            </li>
          </ul>
          <switch-theme class="swith-theme" />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.swith-theme {
  margin-left: 16px;
}
@media (max-width: 991px) {
  .navbar-brand {
    margin-top: 8px;
  }
  .swith-theme {
    margin-left: 0;
    margin-top: 8px;
  }
}
</style>
