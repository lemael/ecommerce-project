# 🛍️ E-Commerce Website with AI Chatbot

This project is a fullstack e-commerce application built with **React (TypeScript)** on the frontend and **.NET (C#)** on the backend.
It includes authentication, product management, an AI-powered chatbot for customer support, and deployment via **Render** using Docker.

---

## 🚀 Features

* **Frontend (React + TypeScript)**

  * User registration & login (JWT authentication)
  * Product listing (clothes & fashion items)
  * Integration of AI chatbot for customer consultation
  * Responsive design

* **Backend (.NET)**

  * RESTful API for authentication and product management
  * JWT-based security
  * PostgreSQL database hosted on Render
  * Docker support for containerized deployment

* **AI Chatbot**

  * Provides interactive customer consultation (Kundenberatung)
  * Integrated into the frontend

---

## 🛠️ Technologies Used

* **Frontend:** React, TypeScript
* **Backend:** .NET 6+, C#
* **Database:** PostgreSQL (Render)
* **Authentication:** JWT (password hashing to be added)
* **Containerization:** Docker
* **Deployment:** Render

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2️⃣ Backend Setup (.NET API)

```bash
cd backend
dotnet restore
dotnet run
```

The backend runs on:
👉 `http://localhost:5045`

### 3️⃣ Frontend Setup (React + TS)

```bash
cd frontend
npm install
npm start
```

The frontend runs on:
👉 `http://localhost:3000`

---

## 🐳 Docker Deployment

You can build and run the project using Docker:

```bash
docker build -t ecommerce-app .
docker run -p 3000:3000 -p 5045:5045 ecommerce-app
```

Alternatively, the app is automatically deployed on **Render** via GitHub integration.

---

## 🔒 Security

* User authentication with **JWT**
* Passwords currently stored in plain text (⚠️ hashing to be implemented)
* Planned improvement: use **bcrypt** for password hashing

---

## 📚 Future Improvements

* ✅ Password hashing with bcrypt
* ✅ Product categories & filtering
* ✅ Shopping cart & checkout system
* ✅ Role-based access (Admin vs. User)
* ✅ Implementing unit and integration tests for different functionalities

---

## 👨‍💻 Author

Developed by **Mael Fosso**
Backend: .NET • Frontend: React + TS • Database: PostgreSQL

---
