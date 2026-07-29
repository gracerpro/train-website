<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue"
import { LATEST_VERSION } from "@/api/ReleaseApi"
import SwitchTheme from "@/components/SwitchTheme.vue"
import { NAME_FEEDBACK } from "@/router"

const togglerButtonRef = useTemplateRef<HTMLElement>("togglerButtonRef")

onMounted(() => {
  if (!import.meta.env.SSR) {
    import("bootstrap").then(({ Collapse }) => {
      if (togglerButtonRef.value) {
        new Collapse(togglerButtonRef.value)
      }
    })
  }
})
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <button
          ref="togglerButtonRef"
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" class="collapse navbar-collapse justify-content-center">
          <router-link :to="{ name: 'home' }" class="navbar-brand d-block" title="Главная">
            <img src="/favicon.svg" width="24px" height="24px" class="app-icon" />
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
              <router-link :to="{ name: NAME_FEEDBACK }" class="nav-link"
                >Обратная связь</router-link
              >
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
/* TODO: change color by theme

.app-icon {
  display: inline-block;
  vertical-align: middle;
  background-color: red;
  mask-image: url(/favicon.svg);
  mask-size: 100%;
  mask-repeat: no-repeat;
  mask-position: center;
  width: 24px;
  height: 24px;
}*/

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
