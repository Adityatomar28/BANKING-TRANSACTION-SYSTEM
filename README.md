# 🏦 Banking Transaction System — Backend

A **production-style Banking Backend System** built using **Node.js, Express, and MongoDB** that simulates real-world banking operations like authentication, account management, secure transactions, and ledger-based balance tracking.

This project demonstrates how modern banking systems ensure **data consistency**, **security**, and **reliable transaction processing**.

---

## 🚀 Features

* 🔐 JWT-based Authentication (Register / Login / Logout)
* 🔑 Secure Password Hashing using **bcrypt**
* 🏦 Bank Account Creation & Management
* 💸 Money Transfer System
* 📒 Ledger-Based Balance Calculation
* 🛡️ Idempotency Protection (Prevents duplicate transactions)
* 📧 Email Notifications using **Nodemailer**
* 🚪 Token Blacklisting on Logout
* 🌐 RESTful API Architecture

---

## 🧰 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB Atlas**
* **Mongoose**
* **JWT Authentication**
* **bcrypt**
* **Nodemailer**
* **dotenv**

---

## 📁 Project Structure

```bash
BANKING-TRANSACTION-SYSTEM/
│
├── src/
│   ├── config/
│   │     db.js
│   │
│   ├── controllers/
│   │     authController.js
│   │     accountController.js
│   │     transactionController.js
│   │
│   ├── middleware/
│   │     authMiddleware.js
│   │
│   ├── models/
│   │     User.js
│   │     Account.js
│   │     Transaction.js
│   │     Ledger.js
│   │     Blacklist.js
│   │
│   ├── routes/
│   │     authRoutes.js
│   │     accountRoutes.js
│   │     transactionRoutes.js
│   │
│   ├── services/
│   │     emailService.js
│   │     transactionService.js
│   │
│   └── app.js
│
├── server.js
├── package.json
└── .env
```

---

## 🔐 Authentication Flow

```text
User Register
     ↓
Password Hashed (bcrypt)
     ↓
User Login
     ↓
JWT Token Generated
     ↓
Access Protected Routes
```

---

## 💸 Transaction Flow

```text
Create Transaction
        ↓
Validate Idempotency Key
        ↓
Debit Sender Account
        ↓
Credit Receiver Account
        ↓
Create Ledger Entries
        ↓
Send Email Notification
```

---

## 📡 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Account

```http
POST /api/account/create
GET /api/account/balance
GET /api/account/status
```

### Transactions

```http
POST /api/transaction/send
GET /api/transaction/history
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 🧠 Key Concepts Implemented

* Secure Authentication & Authorization
* Ledger-Based Accounting System
* Idempotency Handling
* REST API Design
* Middleware Protection
* Email Notification System

---

## 👨‍💻 Author

**Aditya Singh Tomar**
GitHub: https://github.com/Adityatomar28

---

## ⭐ Project Goal

To demonstrate how a **real-world banking backend system** handles authentication, transactions, and ledger management using secure and scalable backend architecture.
