<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from "vue"
import SwitchTheme from "@/components/SwitchTheme.vue"
import { NAME_FEEDBACK } from "@/router"
import { useMobileClientStore } from "@/store/client-store"
import { ReleaseApi } from "@/api/ReleaseApi"

const releaseApi = new ReleaseApi()

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

const mobileClientStore = useMobileClientStore()

const latestVersion = computed(() => mobileClientStore.version)

loadLatest()

function loadLatest() {
  releaseApi
    .getLatest()
    .then((release) => {
      if (release) {
        mobileClientStore.setVersion(release.version)
      }
    })
    .catch((e) => {
      console.error(e)
    })
}
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
            <span class="app-icon" />
            <span class="align-middle ms-2">{{ latestVersion }}</span>
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
.app-icon {
  display: inline-block;
  vertical-align: middle;
  background-color: #000000;
  mask: url("/favicon.svg") no-repeat center / contain;
  width: 24px;
  height: 24px;
}
[data-bs-theme="dark"] .app-icon {
  background-color: #ffffff;
}

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
