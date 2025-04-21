<script setup>
const currentYear = new Date().getFullYear()
const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <footer class="mt-4 pb-4 text-center footer">
    <div class="container">Copyright &copy; Vyacheslav 2024-{{ currentYear }}, {{ appName }}</div>
  </footer>
</template>
