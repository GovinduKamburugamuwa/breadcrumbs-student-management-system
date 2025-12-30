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
- [Database Setup](#-database-setup)
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
# Copy the example file
cp .env.example .env

# Or create manually with this content:
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here_12345
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

**Create `.env` file in client folder:**
```bash
# Copy the example file
cp .env.example .env

# Or create manually with this content:
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Configure MongoDB Database
See [Database Setup](#-database-setup) section below

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

## 💾 Database Setup

This project uses **MongoDB Atlas** (cloud database). Follow these steps:

### 1. Create MongoDB Atlas Account (FREE)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** and create an account
3. Verify your email

### 2. Create a Database Cluster

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select a **Cloud Provider & Region** (choose closest to you)
4. Cluster Name: `Cluster0` (default is fine)
5. Click **"Create"**

### 3. Create Database User

1. **Security** → **Database Access** → **Add New Database User**
2. Authentication Method: **Password**
3. Username: `studentadmin` (or your choice)
4. Password: Create a strong password (**SAVE THIS!**)
5. Database User Privileges: **"Atlas admin"**
6. Click **"Add User"**

### 4. Setup Network Access

1. **Security** → **Network Access** → **Add IP Address**
2. Click **"Allow Access from Anywhere"** (for development)
3. IP Address: `0.0.0.0/0` (auto-filled)
4. Click **"Confirm"**

### 5. Get Connection String

1. **Database** → **Connect** → **Drivers**
2. Driver: **Node.js**
3. **Copy** the connection string
4. It looks like:
   ```
   mongodb+srv://studentadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 6. Update Your `.env` File

Open `server/.env` and update:
```env
MONGODB_URI=mongodb+srv://studentadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/student-management?retryWrites=true&w=majority
```

**Important:** 
- Replace `YOUR_PASSWORD` with the password you created
- Replace `cluster0.xxxxx` with your actual cluster address
- The database name `student-management` will be auto-created

### 7. Verify Connection

When you start the backend server, you should see:
```
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
```

### Database Schema (Auto-Created)

The following collections will be automatically created:

**Students Collection:**
```javascript
{
  firstName: String (required, min 2 chars)
  lastName: String (required, min 2 chars)
  email: String (required, unique, email format)
  phoneNumber: String (optional, 10-15 digits)
  gender: String (required, enum: Male/Female/Other)
  birthdate: Date (optional, must be past date)
  isDeleted: Boolean (default: false)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

**Users Collection:**
```javascript
{
  name: String (required)
  email: String (required, unique)
  password: String (hashed, required)
  role: String (default: 'user')
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

**Note:** No SQL dump or migration files needed - MongoDB/Mongoose creates collections automatically!

---

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

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Backend (Production):**
```bash
cd server
npm start
```

### Available Scripts

**Backend (server folder):**
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server

**Frontend (client folder):**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🌟 Bonus Features Implemented

| Feature | Description | Status |
|---------|-------------|--------|
| **Search** | Real-time search by name or email | ✅ |
| **Export CSV** | Download all students as CSV file | ✅ |
| **Export PDF** | Generate printable PDF report | ✅ |
| **Soft Delete** | Mark students as deleted (not permanent) | ✅ |
| **Restore** | Recover soft-deleted students | ✅ |
| **Authentication** | Secure JWT-based login system | ✅ |
| **Pagination** | Navigate through large datasets | ✅ |
| **Validation** | Client & server-side input validation | ✅ |
| **Responsive UI** | Works on mobile, tablet, desktop | ✅ |

---

## 📡 API Endpoints

### Authentication (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (protected) |

### Students (Protected - Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students (paginated) |
| GET | `/api/students/:id` | Get single student |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Soft delete student |
| GET | `/api/students/deleted` | Get deleted students |
| PATCH | `/api/students/:id/restore` | Restore deleted student |
| GET | `/api/students/export/csv` | Export to CSV |
| GET | `/api/students/export/pdf` | Export to PDF |

**Example Request:**
```bash
# Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

# Create Student (with token)
POST http://localhost:5000/api/students
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phoneNumber": "1234567890",
  "gender": "Female",
  "birthdate": "2000-05-15"
}
```

---

## 📁 Project Structure

```
student-management-system/
│
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── StudentTable.jsx
│   │   │   ├── StudentModal.jsx
│   │   │   ├── StudentDetailsModal.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/                  # Page components
│   │   │   ├── Dashboard.jsx       # Main app page
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/               # API services
│   │   │   ├── api.js              # Axios config
│   │   │   └── studentService.js   # API methods
│   │   ├── context/                # State management
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx                 # Root component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Tailwind styles
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Express Backend
│   ├── config/
│   │   └── database.js             # MongoDB connection
│   ├── controllers/                # Route handlers
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   └── exportController.js
│   ├── middleware/                 # Custom middleware
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── errorMiddleware.js      # Error handling
│   ├── models/                     # Mongoose schemas
│   │   ├── student.js
│   │   └── user.js
│   ├── routes/                     # API routes
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│   ├── utils/                      # Helper functions
│   │   ├── csvExport.js
│   │   └── pdfExport.js
│   ├── server.js                   # Entry point
│   ├── .env                        # Environment variables
│   └── package.json
│
├── README.md                        # This file
├── SETUP_GUIDE.md                  # Quick setup guide
├── IMPLEMENTATION.md               # Features checklist
└── .gitignore
```

---

## 🔒 Security Features

✅ JWT-based authentication  
✅ Password hashing with bcrypt  
✅ Protected API routes  
✅ Input validation (client + server + database)  
✅ CORS configuration  
✅ Environment variables for secrets  
✅ Secure error messages (no sensitive data leaks)  

---

## 🧪 Testing the Application

1. Open **http://localhost:5173**
2. Click **"Register"** and create an account
3. **Login** with your credentials
4. **Add Student** - Click "Add Student" button
5. **Search** - Type in the search box
6. **Edit** - Click pencil icon ✏️
7. **View** - Click eye icon 👁️
8. **Delete** - Click trash icon 🗑️
9. **Export** - Click CSV or PDF buttons

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Failed

**Solution:**
1. Check your `.env` file in `server/` folder
2. Ensure `MONGODB_URI` is correct
3. Verify you replaced `<password>` with actual password
4. Check MongoDB Atlas network access (should allow 0.0.0.0/0)

### Issue: Port Already in Use

**Solution:**
```bash
# Kill the process using the port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# Or change port in server/.env
PORT=5001
```

### Issue: Cannot Login/Register

**Solution:**
1. Ensure backend server is running (check Terminal 1)
2. Verify `VITE_API_URL` in `client/.env` is correct
3. Clear browser cache and localStorage
4. Check browser console (F12) for errors

### Issue: Frontend Not Loading

**Solution:**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📧 Support

If you encounter any issues:
1. Check the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
2. Review terminal output for error messages
3. Ensure all dependencies are installed
4. Verify environment variables are correct

---

## 📄 License

This project is created as part of an internship assignment.

---

## 👨‍💻 Developer

**Assignment**: CRUD Application - Student Management System  
**Position**: Associate Software Engineer Intern  
**Tech Stack**: MERN Stack (MongoDB, Express.js, React, Node.js)  
**Year**: 2025

---

**⭐ All assignment requirements implemented, including bonus features!**
