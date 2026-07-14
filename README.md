# Eco-Share — Frontend (Vue 3)

Frontend web application (mobile-responsive) untuk sistem rental **Eco-Share**, dikembangkan
menggunakan **Vue 3 + Vite**, terintegrasi dengan backend API (Express + Sequelize + MySQL)
yang dikerjakan sebelumnya.

## Fitur

- **Autentikasi**: Login & Register terhubung ke `/api/login` dan `/api/register`, token JWT
  disimpan dan otomatis disisipkan ke setiap request.
- **Role Access**: dua peran, `penyewa` dan `owner` (pemilik barang).
  - `penyewa`: melihat daftar produk & bisa menyewa barang.
  - `owner`: bisa menambah produk, tidak bisa menyewa barang (produknya sendiri ditandai).
  - Halaman/route dijaga dengan navigation guard (`src/router/index.js`) berdasarkan role.
- **Modul Transaksional**: sewa barang dengan pengecekan stok otomatis (validasi dari backend),
  kalkulasi estimasi total biaya secara real-time di modal sewa, dan riwayat transaksi
  (berbeda tampilan untuk penyewa vs owner).
- **Penanganan Error Terpadu**: satu axios interceptor (`src/api/axios.js`) menerjemahkan semua
  error API (validasi, stok habis, token kedaluwarsa, server down, dsb) ke pesan yang konsisten,
  ditampilkan lewat komponen toast global (`ToastAlert.vue`).

## Struktur Proyek

```
src/
├── api/axios.js          → instance axios + interceptor JWT & error handling
├── stores/
│   ├── auth.js           → Pinia store: login, register, logout, role
│   └── ui.js             → Pinia store: toast notifikasi global
├── router/index.js       → routing + guard (auth & role)
├── components/
│   ├── AppNavbar.vue     → navigasi responsif (hamburger di mobile)
│   ├── ToastAlert.vue    → notifikasi error/sukses terpadu
│   ├── ProductCard.vue
│   └── RentalModal.vue
└── views/
    ├── LoginView.vue
    ├── RegisterView.vue
    ├── ProductListView.vue
    ├── ProductCreateView.vue   (khusus owner)
    ├── RentalHistoryView.vue
    └── NotFoundView.vue
```

## Persiapan Backend (Eco-Share API)

Backend sebelumnya ditambahkan beberapa endpoint & perbaikan agar bisa dipakai frontend ini:

- `GET /api/products` — daftar semua produk (dengan info owner)
- `GET /api/products/:id` — detail produk
- `GET /api/rentals` — riwayat transaksi (otomatis dibedakan isi datanya oleh backend
  berdasarkan role: `penyewa` → transaksi miliknya, `owner` → transaksi dari produk miliknya)
- `POST /api/products` kini otomatis mengisi `owner_id` dari user yang login
- Tambahan `cors` agar bisa diakses dari `localhost:5173`
- Unified error handler (404 & error 500 terstruktur seragam: `{ success, message }`)

Jangan lupa jalankan `npm install` di folder backend (menambahkan dependency baru: `cors`),
lalu `npm start`.

## Menjalankan Frontend

```bash
npm install
cp .env.example .env     # sesuaikan VITE_API_BASE_URL kalau backend tidak di localhost:3000
npm run dev
```

Buka `http://localhost:5173`.

## Environment Variables

| Variable              | Keterangan                                   |
|------------------------|-----------------------------------------------|
| `VITE_API_BASE_URL`    | Base URL backend API, contoh: `http://localhost:3000/api` |

`.env` **tidak** ikut di-commit (sudah ada di `.gitignore`). Yang di-commit hanya `.env.example`.

## Testing Manual Sebelum Submit

Checklist minimal sebelum submit ke KULON:

1. Register sebagai `owner` → login → tambah 1-2 produk.
2. Register sebagai `penyewa` (akun kedua) → login → lihat produk → coba sewa (qty melebihi
   stok harus ditolak dengan pesan error yang jelas).
3. Cek halaman **Riwayat Transaksi** dari kedua akun, pastikan datanya sesuai perannya
   masing-masing.
4. Coba akses `/products/new` dari akun `penyewa` → harus otomatis diarahkan kembali (guard role).
5. Logout, lalu coba buka halaman yang butuh login → harus diarahkan ke `/login`.
6. Matikan sementara server backend → pastikan muncul toast error yang informatif, bukan layar putih.
7. Cek tampilan di layar sempit (mobile) — navbar harus berubah jadi menu hamburger.

## Database
- MySQL


## Flow Aplikasi

1. Pengguna membuka aplikasi melalui browser.
2. Pengguna melakukan registrasi atau login ke dalam sistem.
3. Sistem melakukan autentikasi menggunakan JWT.
4. Setelah berhasil login, pengguna dapat melihat daftar produk yang tersedia.
5. Pengguna dapat menambahkan, mengubah, dan menghapus data produk sesuai hak akses.
6. Pengguna memilih produk yang ingin disewa.
7. Sistem menyimpan data penyewaan ke dalam database MySQL.
8. Data produk dan riwayat penyewaan dapat dikelola melalui aplikasi.
