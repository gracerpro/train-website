<script setup>
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
</script>

<template>
  <main class="container">
    <h1>Контакты</h1>

    <p>
      Связаться с автором можно через <b>email</b>. В будущем планируется добавить форму обратной
      связи.
    </p>
    <div class="text-center">
      <a :href="'mailto:' + adminEmail" class="link-primary">{{ adminEmail }}</a>
    </div>
  </main>
</template>
