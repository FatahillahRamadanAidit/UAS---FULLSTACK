<template>
  <div class="form-shell">
    <p class="eyebrow">Pemilik Barang</p>
    <h1>Tambah produk baru</h1>
    <p class="sub">Isi detail barang yang ingin kamu sewakan ke penyewa lain.</p>

    <form class="card form-card" @submit.prevent="handleSubmit">
      <div class="field">
        <label for="name">Nama barang</label>
        <input id="name" v-model="form.name" type="text" required placeholder="cth. Sepeda Lipat" />
      </div>

      <div class="field">
        <label for="price">Harga sewa per hari (Rp)</label>
        <input id="price" v-model.number="form.price_per_day" type="number" min="1" required />
      </div>

      <div class="field">
        <label for="stock">Jumlah stok</label>
        <input id="stock" v-model.number="form.stock" type="number" min="0" required />
      </div>

      <div class="field">
        <label for="status">Status</label>
        <select id="status" v-model="form.status">
          <option value="available">Tersedia</option>
          <option value="maintenance">Dalam perawatan</option>
        </select>
      </div>

      <div class="form-actions">
        <RouterLink to="/" class="btn btn-ghost">Batal</RouterLink>
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          {{ submitting ? "Menyimpan..." : "Simpan Produk" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axios";
import { useUiStore } from "../stores/ui";

const router = useRouter();
const ui = useUiStore();
const submitting = ref(false);

const form = reactive({
  name: "",
  price_per_day: null,
  stock: null,
  status: "available"
});

async function handleSubmit() {
  submitting.value = true;
  try {
    await api.post("/products", { ...form });
    ui.pushToast({ type: "success", message: "Produk berhasil ditambahkan." });
    router.push({ name: "products" });
  } catch {
    // Ditangani interceptor
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.form-shell {
  max-width: 480px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--lake);
  margin: 0 0 0.35rem;
}

.sub {
  color: var(--muted);
  font-size: 0.88rem;
  margin: 0 0 1.5rem;
}

.form-card {
  padding: 1.75rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 0.5rem;
}
</style>
