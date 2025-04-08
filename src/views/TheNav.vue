<template>
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
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">Главная</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'history' }" class="nav-link">История</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'documentation' }" class="nav-link">Документация</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'faq' }" class="nav-link">ЧаВо</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
