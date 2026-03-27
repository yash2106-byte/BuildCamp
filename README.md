# BuildCamp 
## 📌 Overview

BuildCamp API is a Full Stack web designed to manage projects, tasks, subtasks, and team collaboration with secure authentication and role-based access control.

It enables teams to efficiently organize workflows, assign tasks, and track progress.

---

## ✨ Features

### 🔐 Authentication & Security

* JWT-based authentication
* Email verification & password reset
* Role-based access control (Admin, Project Admin, Member)

### 📁 Project Management

* Create, update, and delete projects
* Manage project members and roles

### ✅ Task Management

* Create and assign tasks
* Track status (Todo, In Progress, Done)
* File attachments support

### 🔗 Subtasks

* Nested task breakdown
* Completion tracking for team members

### 📝 Notes

* Project-level notes management (Admin only)

### ⚙️ System

* Health check endpoint
* Secure API architecture

---

## 🛠️ Tech Stack

* Backend: Node.js / Express
* Frontend: React
* Database: MongoDB (or your DB)
* Auth: JWT
* File Upload: Multer

---


## 📂 API Modules

* `/auth` → Authentication
* `/projects` → Project management
* `/tasks` → Tasks & subtasks
* `/notes` → Project notes
* `/healthcheck` → System status

---

## 🔑 Roles & Permissions

| Role          | Access Level   |
| ------------- | -------------- |
| Admin         | Full control   |
| Project Admin | Manage tasks   |
| Member        | Limited access |

---

## 📁 Project Structure

```
projectcamp-api/
│── src/
│── controllers/
│── routes/
│── models/
│── middleware/
│── utils/
```

---

## 🎯 Future Improvements

* Real-time updates (WebSockets)
* Notifications system

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📄 License

MIT License
