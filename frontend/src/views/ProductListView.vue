<template>
  <div>
    <div class="page-head">
      <div>
        <p class="eyebrow">Beranda</p>
        <h1>{{ auth.isOwner ? "Barang yang tersedia disewa" : "Cari barang untuk disewa" }}</h1>
      </div>
      <RouterLink v-if="auth.isOwner" to="/products/new" class="btn btn-primary">
        + Tambah Produk
      </RouterLink>
    </div>

    <div v-if="loading" class="empty-state">Memuat daftar produk...</div>

    <div v-else-if="products.length === 0" class="empty-state card">
      <h3>Belum ada produk</h3>
      <p>
        {{ auth.isOwner
          ? "Tambahkan produk pertamamu supaya bisa disewa orang lain."
          : "Belum ada barang yang tersedia untuk disewa saat ini." }}
      </p>
    </div>

    <div v-else class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :can-rent="auth.isPenyewa"
        :is-own-product="auth.isOwner && product.owner_id === auth.user?.id"
        @rent="openRentalModal"
      />
    </div>

    <RentalModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
      @success="handleRentalSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";
import { useAuthStore } from "../stores/auth";
import ProductCard from "../components/ProductCard.vue";
import RentalModal from "../components/RentalModal.vue";

const auth = useAuthStore();
const products = ref([]);
const loading = ref(true);
const selectedProduct = ref(null);

async function loadProducts() {
  loading.value = true;
  try {
    const { data } = await api.get("/products");
    products.value = data.data;
  } catch {
    // Error sudah ditampilkan lewat toast global
  } finally {
    loading.value = false;
  }
}

function openRentalModal(product) {
  selectedProduct.value = product;
}

function handleRentalSuccess() {
  selectedProduct.value = null;
  loadProducts();
}

onMounted(loadProducts);
</script>

<style scoped>
.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--lake);
  margin: 0 0 0.35rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.1rem;
}
</style>
