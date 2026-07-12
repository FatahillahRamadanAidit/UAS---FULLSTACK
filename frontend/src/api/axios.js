import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { useUiStore } from "../stores/ui";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
});

// Sisipkan token JWT ke setiap request kalau user sudah login
api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

// Penanganan error yang seragam: semua error API "diterjemahkan" jadi
// satu bentuk pesan yang sama, lalu ditampilkan lewat toast global.
// Komponen pemanggil tetap bisa menangkap error lewat try/catch kalau perlu logic tambahan.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const auth = useAuthStore();
    const ui = useUiStore();

    let message = "Terjadi masalah saat menghubungi server. Coba lagi.";

    if (error.response) {
      // Server merespons dengan status error (4xx/5xx)
      message = error.response.data?.message || `Error ${error.response.status}`;

      if (error.response.status === 401) {
        message = "Sesi kamu berakhir, silakan login kembali.";
        auth.logout();
        window.location.hash = "#/login";
      }
    } else if (error.request) {
      // Request terkirim tapi tidak ada respons (server mati / offline)
      message = "Tidak bisa terhubung ke server. Periksa koneksi atau server API.";
    }

    ui.pushToast({ type: "error", message });

    return Promise.reject({ ...error, unifiedMessage: message });
  }
);

export default api;
