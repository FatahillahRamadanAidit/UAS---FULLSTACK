# Eco-Share — Backend API

Backend REST API (Express + Sequelize + MySQL) untuk sistem rental Eco-Share.

## Setup

```bash
npm install
cp .env.example .env   # isi sesuai koneksi MySQL kamu
npm start
```

`.env` yang dibutuhkan:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=eco_share
JWT_SECRET=<isi_dengan_string_rahasia>
```

## Role

Ada dua role: `owner` (pemilik barang) dan `penyewa`.

## Endpoints

| Method | Endpoint          | Auth | Role   | Keterangan                              |
|--------|-------------------|------|--------|-------------------------------------------|
| POST   | `/api/register`   | -    | -      | Daftar akun baru (name, email, password, role) |
| POST   | `/api/login`      | -    | -      | Login, mengembalikan JWT                  |
| GET    | `/api/profile`    | ✔    | -      | Data user dari token                      |
| GET    | `/api/products`   | ✔    | -      | Daftar semua produk                       |
| GET    | `/api/products/:id` | ✔  | -      | Detail satu produk                        |
| POST   | `/api/products`   | ✔    | owner  | Tambah produk baru (owner_id otomatis dari token) |
| POST   | `/api/rentals`    | ✔    | -      | Buat transaksi sewa (cek stok otomatis, transaction-safe) |
| GET    | `/api/rentals`    | ✔    | -      | Riwayat transaksi — isi berbeda tergantung role (penyewa: transaksinya sendiri, owner: transaksi dari produk miliknya) |

Semua response error mengikuti format seragam: `{ "success": false, "message": "..." }`.
