# Student Management System

A full-stack CRUD application for managing student records with authentication, search, pagination, and export features.

> **Assignment**: CRUD Application - Student Management System  
> **Position**: Associate Software Engineer Intern  
> **Tech Stack**: MERN (MongoDB, Express, React, Node.js)

---

## 📋 Table of Contents
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Setup Instructions](#-setup-instructions)
- [Running the Application](#-running-the-application)
- [Bonus Features](#-bonus-features-implemented)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)

---

## 🛠️ Tech Stack

### Backend
- **Node.js** (v16+) with **Express.js** (v5.2.1)
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose** (v9.0.2) - MongoDB ODM
- **JWT** (jsonwebtoken v9.0.3) - Authentication
- **bcryptjs** (v3.0.3) - Password hashing
- **express-validator** (v7.3.1) - Input validation

### Frontend
- **React** (v19.2.0) with **Vite** (v7.2.4)
- **Tailwind CSS** (v4.1.18) - Utility-first CSS framework
- **Axios** (v1.13.2) - HTTP client
- **React Hot Toast** (v2.6.0) - Toast notifications
- **Lucide React** (v0.562.0) - Icon library

---

## ✨ Features

### Core CRUD Operations
✅ **Create** - Add new students with validation  
✅ **Read** - View all students in paginated table  
✅ **Update** - Edit existing student information  
✅ **Delete** - Soft delete with confirmation prompt  
✅ **View Details** - Full student profile modal  

### Bonus Features Implemented
✅ **Search** - Real-time search by name or email  
✅ **Export to CSV** - Download student data  
✅ **Export to PDF** - Generate printable reports  
✅ **Soft Delete & Restore** - Recover deleted records  
✅ **Authentication** - Secure login/register system  
✅ **Pagination** - Navigate large datasets efficiently  

---

## 🚀 Setup Instructions

### Step 1: Download the Project

**Option A: Clone from GitHub**
```bash
git clone https://github.com/GovinduKamburugamuwa/breadcrumbs-student-management-system.git
cd student-management-system
```

**Option B: Download ZIP**
- Download and extract the ZIP file
- Open the folder in your terminal

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

**Create `.env` file in server folder:**
```bash

# create manually with this content:
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here_12345
```

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

**Create `.env` file in client folder:**
```bash

# add this content:
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Start the Application

Open **TWO terminal windows**:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
✅ Server runs on: **http://localhost:5000**

**Terminal 2 - Frontend App:**
```bash
cd client
npm run dev
```
✅ App opens at: **http://localhost:5173**

### Step 6: Access the Application

1. Open your browser to **http://localhost:5173**
2. Click **"Register"** to create an account
3. Login and start managing students!

---

### 7. Verify Connection

When you start the backend server, you should see:
```
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
```

## 🚀 Running the Application

### Development Mode

**Start Backend:**
```bash
cd server
npm run dev
```

**Start Frontend:**
```bash
cd client
npm run dev
```

## 🌟 Bonus Features Implemented

| Feature | Description | Status |
|---------|-------------|--------|
| **Search** | Real-time search by name or email | ✅ |
| **Export CSV** | Download all students as CSV file | ✅ |
| **Export PDF** | Generate printable PDF report | ✅ |
| **Soft Delete** | Mark students as deleted (not permanent) | ✅ |
| **Restore** | Recover soft-deleted students | ✅ |
| **Authentication** | Secure JWT-based login system(admin acess) | ✅ |
| **Validation** | Client & server-side input validation | ✅ ||
| **API-based implementation** | API-based implementation with Postman collection  | ✅ ||

---


## 👨‍💻 Developer (Govindu Kamburugamuwa)

**Assignment**: CRUD Application - Student Management System  
**Position**: Associate Software Engineer Intern  
**Tech Stack**: MERN Stack (MongoDB, Express.js, React, Node.js)  
**Year**: 2025

---

