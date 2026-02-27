# 📦 InvenTrack – Inventory Management System

InvenTrack is a **full-stack inventory management web application** that allows businesses to manage stock, monitor activity logs, and analyze inventory through dashboards.

Built using **React + Node.js + MongoDB**.

---

## 🚀 Features

### 🔐 Authentication

* User registration
* Login with role (Admin / User)
* Password encryption using bcrypt

---

### 📦 Inventory Management

* Add new stock items
* Edit existing items
* Delete items
* Store:

  * Product name
  * Brand
  * Location
  * Quantity
  * Price

---

### 📊 Dashboard

* Total Products
* Total Units
* Low Stock count
* Total Inventory Value
* Charts:

  * Stock quantity (Bar chart)
  * Inventory value distribution (Pie chart)

---

### 🧾 Activity Log

* Tracks all actions:

  * Added Item
  * Updated Item
  * Deleted Item
* Sorted by latest activity

---

### ⚙️ Settings

* Update name & email
* Change password
* Delete account

---

### 🧠 AI Insights (Basic version)

* Calculates:

  * Low stock items
  * Overstock items
  * High value items
  * Total inventory value

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Lucide Icons
* Chart.js

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* bcryptjs

---

## 📁 Project Structure

```
inventrack-app/
│
├── backend/
│   ├── server.js
│   ├── package.json
│
├── src/
│   ├── components/
│   │   ├── AuthScreen.jsx
│   │   ├── Dashboard.jsx
│   │   ├── InventoryList.jsx
│   │   ├── ActivityLog.jsx
│   │   ├── SettingsView.jsx
│   │   ├── AIPanel.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── index.html
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/YOUR_USERNAME/inventrack-app.git
cd inventrack-app
```

---

### 2️⃣ Install Frontend

```
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

### 3️⃣ Setup Backend

```
cd backend
npm install
node server.js
```

Backend runs at:

```
http://localhost:5000
```

---

### 4️⃣ MongoDB Setup

Ensure MongoDB is running locally:

```
mongodb://127.0.0.1:27017/inventrack
```

---

## 🔗 API Endpoints

### 🔐 Auth

* `POST /register`
* `POST /login`

### 👤 User Settings

* `PUT /user/update`
* `POST /user/change-password`
* `DELETE /user/delete/:email`

### 📦 Inventory

* `GET /items`
* `POST /items`
* `PUT /items/:id`
* `DELETE /items/:id`

### 🧾 Activity

* `GET /activity`

### 📊 Insights

* `GET /insights` (calculated analytics)

---

## 📊 Data Models

### 👤 User

* email
* password
* name
* role (admin / user)

### 📦 Item

* name
* brand
* location
* quantity
* price
* createdAt

### 🧾 ActivityLog

* action
* item
* quantity
* user
* timestamps

---

## 🔒 Security

* Password hashing using bcrypt
* Role-based UI access
* Input validation on backend

---

## 🎯 Future Improvements

* JWT Authentication
* Export reports (PDF / Excel)
* Barcode scanner integration
* Cloud deployment (Render / Vercel / AWS)
* AI-based demand prediction

---

## 👨‍💻 Author

**Pramod Malagundi**

Inventory Management System Project
Built for academic & practical implementation

---

## ⭐ GitHub

After pushing, your repository link:

```
https://github.com/PramodMallilkarjunaMalagundi/Inventory-Management-System
```

---

## 🙌 Support

If you like this project, give it a ⭐ on GitHub!
