# 🚀 Back-End API with Node.js, Express, TypeScript, Prisma & PostgreSQL

Project ini merupakan back-end API yang dibangun dengan stack modern: **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, dan **PostgreSQL** sebagai basis datanya.

---

## 🧰 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **TypeScript** – Typed superset of JavaScript
- **Prisma** – Modern ORM untuk PostgreSQL
- **PostgreSQL** – Relational Database System

---

## 📁 Struktur Direktori

```bash
.
├── prisma/               # Schema & migration
│   ├── schema.prisma
├── src/
│   ├── controllers/      # Logic untuk masing-masing route
│   ├── routes/           # Endpoint definitions
│   ├── services/         # Business logic
│   ├── middlewares/      # Middleware (auth, error handler, dll)
│   ├── utils/            # Utility functions
│   ├── app.ts            # Inisialisasi express
│   └── index.ts          # Entry point server
├── .env
├── tsconfig.json
├── package.json
└── README.md
```

## ⚙️ Cara Instalasi
# 1. Clone Project
```bash
git clone https://github.com/fadlyian/KasFlow-api.git
cd KasFlow-api
```
# 2. Install Dependencies
```bash
npm install
```
# 3. Setup environment variables
Buat file .env dan isi seperti berikut:
Create Database terlebih dahulu!
```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
PORT=3000
```
# 4. Generate Prisma Client dan migrasi database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```
# 5. Jalankan server:
```bash
npm run dev
```
