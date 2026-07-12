<template>
  <AppNavbar v-if="auth.isAuthenticated" />
  <main class="container page">
    <RouterView />
  </main>
  <ToastAlert />
</template>

<script setup>
import { useAuthStore } from "./stores/auth";
import AppNavbar from "./components/AppNavbar.vue";
import ToastAlert from "./components/ToastAlert.vue";

const auth = useAuthStore();
</script>

<style scoped>
.page {
  padding: 2rem 1.5rem 4rem;
}
</style>
