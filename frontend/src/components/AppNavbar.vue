<template>
  <header class="navbar">
    <div class="navbar__inner container">
      <RouterLink to="/" class="navbar__brand">
        <span class="navbar__mark">Es</span>
        Eco-Share
      </RouterLink>

      <button class="navbar__toggle" @click="open = !open" aria-label="Buka menu">
        <span /><span /><span />
      </button>

      <nav class="navbar__links" :class="{ 'is-open': open }">
        <RouterLink to="/" @click="open = false">Produk</RouterLink>
        <RouterLink to="/rentals" @click="open = false">Riwayat Transaksi</RouterLink>
        <RouterLink v-if="auth.isOwner" to="/products/new" @click="open = false">
          Tambah Produk
        </RouterLink>

        <div class="navbar__user">
          <span class="badge" :class="auth.isOwner ? 'badge-lake' : 'badge-moss'">
            {{ auth.isOwner ? "Pemilik Barang" : "Penyewa" }}
          </span>
          <button class="btn btn-ghost" @click="handleLogout">Keluar</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const router = useRouter();
const open = ref(false);

function handleLogout() {
  auth.logout();
  router.push({ name: "login" });
}
</script>

<style scoped>
.navbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--moss-dark);
  text-decoration: none;
}

.navbar__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--moss);
  color: #fff;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.85rem;
}

.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
}
.navbar__toggle span {
  width: 22px;
  height: 2px;
  background: var(--moss-dark);
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.navbar__links a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}
.navbar__links a.router-link-exact-active {
  color: var(--moss-dark);
}

.navbar__user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 1rem;
  border-left: 1px solid var(--border);
}

@media (max-width: 780px) {
  .navbar__toggle { display: flex; }

  .navbar__links {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 1.5rem 1.5rem;
    display: none;
    gap: 1rem;
  }
  .navbar__links.is-open { display: flex; }
  .navbar__user {
    border-left: none;
    padding-left: 0;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
    width: 100%;
    justify-content: space-between;
  }
}
</style>
