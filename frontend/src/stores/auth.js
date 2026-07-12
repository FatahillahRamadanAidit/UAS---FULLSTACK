import { defineStore } from "pinia";
import api from "../api/axios";

// Decode payload JWT (id, role, exp) tanpa perlu library tambahan
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("eco_share_token") || null,
    user: JSON.parse(localStorage.getItem("eco_share_user") || "null"),
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    role: (state) => state.user?.role || null,
    isOwner: (state) => state.user?.role === "owner",
    isPenyewa: (state) => state.user?.role === "penyewa"
  },

  actions: {
    async login(email, password) {
      this.loading = true;
      try {
        const { data } = await api.post("/login", { email, password });
        const payload = decodeToken(data.token);

        this.token = data.token;
        this.user = { id: payload?.id, role: payload?.role };

        localStorage.setItem("eco_share_token", this.token);
        localStorage.setItem("eco_share_user", JSON.stringify(this.user));

        return true;
      } finally {
        this.loading = false;
      }
    },

    async register(payload) {
      this.loading = true;
      try {
        await api.post("/register", payload);
        return true;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("eco_share_token");
      localStorage.removeItem("eco_share_user");
    }
  }
});
