<template>
  <div class="product-card card">
    <div class="product-card__head">
      <h3>{{ product.name }}</h3>
      <span class="badge" :class="stockBadgeClass">{{ stockLabel }}</span>
    </div>

    <p class="product-card__price">
      Rp{{ formatNumber(product.price_per_day) }}
      <span>/ hari</span>
    </p>

    <p class="product-card__meta">
      Stok tersedia: {{ product.stock }}
      <span v-if="product.owner"> · Pemilik: {{ product.owner.name }}</span>
    </p>

    <button
      v-if="canRent"
      class="btn btn-primary"
      style="width:100%; margin-top: 0.75rem;"
      :disabled="product.stock <= 0"
      @click="$emit('rent', product)"
    >
      {{ product.stock <= 0 ? "Stok Habis" : "Sewa Barang Ini" }}
    </button>

    <p v-else-if="isOwnProduct" class="own-tag">Ini produkmu sendiri</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  product: { type: Object, required: true },
  canRent: { type: Boolean, default: false },
  isOwnProduct: { type: Boolean, default: false }
});

defineEmits(["rent"]);

const stockLabel = computed(() => {
  if (props.product.stock <= 0) return "Habis";
  if (props.product.stock <= 3) return "Terbatas";
  return "Tersedia";
});

const stockBadgeClass = computed(() => {
  if (props.product.stock <= 0) return "badge-danger";
  if (props.product.stock <= 3) return "badge-warn";
  return "badge-moss";
});

function formatNumber(n) {
  return new Intl.NumberFormat("id-ID").format(n || 0);
}
</script>

<style scoped>
.product-card {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
}

.product-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.product-card__head h3 {
  margin: 0;
  font-size: 1.05rem;
}

.product-card__price {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--moss-dark);
  margin: 0.6rem 0 0.2rem;
}
.product-card__price span {
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--muted);
}

.product-card__meta {
  font-size: 0.82rem;
  color: var(--muted);
  margin: 0;
}

.own-tag {
  margin: 0.75rem 0 0;
  font-size: 0.82rem;
  color: var(--lake);
  font-weight: 600;
}
</style>
