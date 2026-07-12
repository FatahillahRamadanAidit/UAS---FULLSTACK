<template>
  <div class="toast-stack" aria-live="polite">
    <transition-group name="toast">
      <div
        v-for="toast in ui.toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.type}`"
        role="alert"
      >
        <span class="toast__dot" />
        <p>{{ toast.message }}</p>
        <button class="toast__close" @click="ui.dismissToast(toast.id)" aria-label="Tutup">
          &times;
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useUiStore } from "../stores/ui";

const ui = useUiStore();
</script>

<style scoped>
.toast-stack {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: min(360px, calc(100vw - 2rem));
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: 0.85rem 0.9rem;
}

.toast p {
  margin: 0;
  font-size: 0.86rem;
  flex: 1;
  line-height: 1.4;
}

.toast__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 0.4rem;
  flex-shrink: 0;
  background: var(--lake);
}

.toast--error .toast__dot { background: var(--danger); }
.toast--success .toast__dot { background: var(--success); }
.toast--info .toast__dot { background: var(--lake); }

.toast__close {
  background: none;
  border: none;
  color: var(--muted);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.toast-enter-active, .toast-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.toast-enter-from { opacity: 0; transform: translateY(-6px); }
.toast-leave-to { opacity: 0; transform: translateX(20px); }
</style>
