# 📋 Task Manager Web App

A responsive and full-featured **Task Manager App** built with the **MERN stack**. Users can securely register, log in, and manage their daily tasks (CRUD) with real-time status updates and a clean UI.  

🔗 **Live Client**: [https://task-manager-client-zeta-five.vercel.app/](https://task-manager-client-zeta-five.vercel.app/)

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- **React.js**
- **React Router DOM**
- **Tailwind CSS** + **DaisyUI**
- **Axios**
- **React Icons**
- **JWT Authentication (via cookies)**
- **Context API** for global state

### 🗃️ Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS**, **cookie-parser**, and **dotenv**

---

## 🔐 Authentication & Authorization

- Secure **custom login system**
- Passwords hashed using **bcrypt**
- **JWT-based authentication** with tokens stored in **HTTP-only cookies**
- Protected routes for task management

---

## ✨ Features

| Feature           | Description         
|------------------|----------------------------------------
| 🔐 Register/Login | Users can register and log in securely                      
| 📋 CRUD Tasks     | Create, Read, Update, and Delete tasks                      
| ✅ Task Status    | Tasks categorized as Completed / Incomplete                 
| 🧠 Auth Context   | Authentication handled with global React Context            
| 📈 Dashboard      | View task overview and profile info                         
| 🖼️ Profile Edit   | Change profile picture, name, and email                     
| ⚙️ Settings       | Account settings and preferences                            
| 📱 Responsive     | Fully mobile-friendly layout                                

---

## 📁 Project Structure

task-manager/
├── public/ # Public assets
│
└── src/
├── controller/ # Controller logic for users and tasks
├── models/ # Mongoose schemas (User, Task)
├── middleware/ # Middleware (JWT auth, error handling)
├── utils/ # Utility functions (e.g., token handling)
├── route/ # Express routes (userRoutes, taskRoutes)
└── index.js # Entry point of the Express server

yaml
Copy
Edit
