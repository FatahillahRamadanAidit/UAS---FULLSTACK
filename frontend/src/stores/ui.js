import { defineStore } from "pinia";

let nextId = 1;

export const useUiStore = defineStore("ui", {
  state: () => ({
    toasts: []
  }),

  actions: {
    pushToast({ type = "info", message }) {
      const id = nextId++;
      this.toasts.push({ id, type, message });

      setTimeout(() => {
        this.dismissToast(id);
      }, 4500);
    },

    dismissToast(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    }
  }
});
