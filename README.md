# Eco Share - UAS Fullstack

Eco Share adalah aplikasi penyewaan barang berbasis web yang dikembangkan sebagai proyek Ujian Akhir Semester (UAS) mata kuliah Fullstack. Aplikasi ini memungkinkan pengguna untuk melihat produk, menyewakan barang, serta mengelola data penyewaan.

---

## Teknologi yang Digunakan

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- bcrypt
- dotenv
- cors

### Frontend
- Vue.js
- Vite
- Axios
- Vue Router

---

## Struktur Project

```
eco-share/
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Instalasi

### Clone Repository

```bash
git clone https://github.com/FatahillahRamadanAidit/UAS---FULLSTACK.git
```

Masuk ke folder project

```bash
cd UAS---FULLSTACK
```

---

## Menjalankan Backend

Masuk ke folder backend

```bash
cd backend
```

Install dependency

```bash
npm install
```

Buat file `.env`

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=uts_fullstack

JWT_SECRET=utsfullstack123
```

Jalankan server

```bash
npm start
```

Server akan berjalan pada

```
http://localhost:3000
```

---

## Menjalankan Frontend

Masuk ke folder frontend

```bash
cd frontend
```

Install dependency

```bash
npm install
```

Jalankan aplikasi

```bash
npm run dev
```

Frontend dapat diakses melalui

```
http://localhost:5173
```

---

## Database

Nama database:

```
uts_fullstack
```

Pastikan MySQL telah aktif sebelum menjalankan backend.

---

## Fitur

- Login User
- Registrasi User
- Menampilkan daftar produk
- Menambah produk
- Edit produk
- Hapus produk
- Penyewaan barang
- Riwayat penyewaan

---

## Screenshot

Tambahkan screenshot aplikasi di sini.

Contoh:

- Halaman Login
- Dashboard
- Daftar Produk
- Penyewaan
- Riwayat Penyewaan

---

## Author

**Fatahillah Ramadan Aidit**

Universitas Dian Nusantara

Teknik Informatika

2026
