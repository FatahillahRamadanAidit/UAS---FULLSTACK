<template>
  <div class="auth-shell">
    <div class="auth-card card">
      <p class="eyebrow">Eco-Share</p>
      <h1>Masuk ke akun kamu</h1>
      <p class="sub">Sewa barang atau kelola barangmu sendiri, semua di satu tempat.</p>

      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" required autocomplete="email" />
        </div>

        <div class="field">
          <label for="password">Kata sandi</label>
          <input id="password" v-model="form.password" type="password" required autocomplete="current-password" />
        </div>

        <button class="btn btn-primary" type="submit" :disabled="auth.loading" style="width:100%">
          {{ auth.loading ? "Memproses..." : "Masuk" }}
        </button>
      </form>

      <p class="switch">
        Belum punya akun? <RouterLink to="/register">Daftar di sini</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useUiStore } from "../stores/ui";

const auth = useAuthStore();
const ui = useUiStore();
const router = useRouter();
const route = useRoute();

const form = reactive({ email: "", password: "" });

async function handleSubmit() {
  try {
    await auth.login(form.email, form.password);
    ui.pushToast({ type: "success", message: "Login berhasil, selamat datang kembali!" });
    router.push(route.query.redirect || { name: "products" });
  } catch {
    // Error sudah ditangani & ditampilkan secara seragam oleh axios interceptor
  }
}
</script>

<style scoped>
.auth-shell {
  min-height: calc(100vh - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 2.25rem 2rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--lake);
  margin: 0 0 0.5rem;
}

.sub {
  color: var(--muted);
  font-size: 0.88rem;
  margin: 0 0 1.5rem;
}

.switch {
  margin-top: 1.25rem;
  font-size: 0.86rem;
  color: var(--muted);
  text-align: center;
}
</style>
