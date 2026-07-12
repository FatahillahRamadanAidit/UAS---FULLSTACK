<template>
  <div>
    <p class="eyebrow">Riwayat</p>
    <h1>{{ auth.isOwner ? "Riwayat penyewaan barangmu" : "Riwayat transaksi sewamu" }}</h1>

    <div v-if="loading" class="empty-state">Memuat riwayat transaksi...</div>

    <div v-else-if="rentals.length === 0" class="empty-state card">
      <h3>Belum ada transaksi</h3>
      <p>
        {{ auth.isOwner
          ? "Belum ada yang menyewa barangmu."
          : "Kamu belum pernah menyewa barang apapun." }}
      </p>
    </div>

    <div v-else class="card table-wrap">
      <table>
        <thead>
          <tr>
            <th>Produk</th>
            <th v-if="auth.isOwner">Disewa oleh</th>
            <th>Qty</th>
            <th>Durasi</th>
            <th>Total Biaya</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rental in rentals" :key="rental.id">
            <td>{{ rental.product?.name || "-" }}</td>
            <td v-if="auth.isOwner">{{ rental.renter?.name || "-" }}</td>
            <td>{{ rental.qty }}</td>
            <td>{{ rental.days }} hari</td>
            <td class="price-cell">Rp{{ formatNumber(rental.total_price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const rentals = ref([]);
const loading = ref(true);

function formatNumber(n) {
  return new Intl.NumberFormat("id-ID").format(n || 0);
}

onMounted(async () => {
  try {
    const { data } = await api.get("/rentals");
    rentals.value = data.data;
  } catch {
    // Ditangani interceptor
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--lake);
  margin: 0 0 0.35rem;
}

.table-wrap {
  overflow-x: auto;
  margin-top: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 480px;
}

th, td {
  text-align: left;
  padding: 0.85rem 1.1rem;
  font-size: 0.88rem;
  border-bottom: 1px solid var(--border);
}

th {
  color: var(--muted);
  font-weight: 600;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

tr:last-child td {
  border-bottom: none;
}

.price-cell {
  font-weight: 700;
  color: var(--moss-dark);
}
</style>
