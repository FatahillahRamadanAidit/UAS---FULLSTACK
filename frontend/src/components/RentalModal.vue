<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal card">
      <h2>Sewa {{ product.name }}</h2>
      <p class="modal__sub">Stok tersedia saat ini: {{ product.stock }}</p>

      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label for="qty">Jumlah barang</label>
          <input
            id="qty"
            v-model.number="form.qty"
            type="number"
            min="1"
            :max="product.stock"
            required
          />
        </div>

        <div class="field">
          <label for="days">Lama sewa (hari)</label>
          <input id="days" v-model.number="form.days" type="number" min="1" required />
        </div>

        <div class="total-box">
          <span>Estimasi total biaya</span>
          <strong>Rp{{ formatNumber(totalPrice) }}</strong>
        </div>

        <div class="modal__actions">
          <button type="button" class="btn btn-ghost" @click="$emit('close')">Batal</button>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? "Memproses..." : "Konfirmasi Sewa" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import api from "../api/axios";
import { useUiStore } from "../stores/ui";

const props = defineProps({
  product: { type: Object, required: true }
});
const emit = defineEmits(["close", "success"]);

const ui = useUiStore();
const submitting = ref(false);

const form = reactive({ qty: 1, days: 1 });

const totalPrice = computed(() => {
  const qty = Number(form.qty) || 0;
  const days = Number(form.days) || 0;
  return props.product.price_per_day * qty * days;
});

function formatNumber(n) {
  return new Intl.NumberFormat("id-ID").format(n || 0);
}

async function handleSubmit() {
  submitting.value = true;
  try {
    await api.post("/rentals", {
      product_id: props.product.id,
      qty: form.qty,
      days: form.days
    });
    ui.pushToast({ type: "success", message: "Transaksi sewa berhasil dibuat." });
    emit("success");
  } catch {
    // Ditangani oleh interceptor axios (toast error seragam)
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(30, 42, 34, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 200;
}

.modal {
  width: 100%;
  max-width: 400px;
  padding: 1.75rem;
}

.modal__sub {
  color: var(--muted);
  font-size: 0.85rem;
  margin: 0.2rem 0 1.25rem;
}

.total-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--moss-tint);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
}
.total-box span {
  font-size: 0.82rem;
  color: var(--moss-dark);
}
.total-box strong {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--moss-dark);
}

.modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
}
</style>
