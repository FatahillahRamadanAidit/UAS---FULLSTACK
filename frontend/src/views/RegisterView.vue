<template>
  <div class="auth-shell">
    <div class="auth-card card">
      <p class="eyebrow">Eco-Share</p>
      <h1>Buat akun baru</h1>
      <p class="sub">Pilih peranmu — menyewa barang, atau menyewakan barangmu ke orang lain.</p>

      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label for="name">Nama lengkap</label>
          <input id="name" v-model="form.name" type="text" required />
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" required autocomplete="email" />
        </div>

        <div class="field">
          <label for="password">Kata sandi</label>
          <input id="password" v-model="form.password" type="password" required minlength="6" autocomplete="new-password" />
        </div>

        <div class="field">
          <label for="role">Daftar sebagai</label>
          <select id="role" v-model="form.role" required>
            <option value="penyewa">Penyewa — ingin menyewa barang</option>
            <option value="owner">Pemilik Barang — ingin menyewakan barang</option>
          </select>
        </div>

        <button class="btn btn-primary" type="submit" :disabled="auth.loading" style="width:100%">
          {{ auth.loading ? "Memproses..." : "Daftar" }}
        </button>
      </form>

      <p class="switch">
        Sudah punya akun? <RouterLink to="/login">Masuk di sini</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useUiStore } from "../stores/ui";

const auth = useAuthStore();
const ui = useUiStore();
const router = useRouter();

const form = reactive({ name: "", email: "", password: "", role: "penyewa" });

async function handleSubmit() {
  try {
    await auth.register({ ...form });
    ui.pushToast({ type: "success", message: "Registrasi berhasil, silakan masuk." });
    router.push({ name: "login" });
  } catch {
    // Ditangani oleh interceptor
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
  max-width: 420px;
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
