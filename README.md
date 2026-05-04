# 📘 Course Management System

## 📌 Project Description

This project is a full-stack academic management system built with an **ASP.NET Core Web API** backend and a **React (Vite)** frontend. It manages **students, instructors, courses, enrollments, and instructor profiles**.

The system demonstrates important Web Engineering concepts such as:

* Entity relationships in Entity Framework Core
* Clean service-layer architecture using Dependency Injection
* DTO validation using Data Annotations
* JWT Authentication via HttpOnly cookies and Role-based Authorization
* User registration system with role-based UI visibility
* Protected client-side routes with redirect for unauthenticated users
* Optimized LINQ querying
* Background processing using Hangfire
* React SPA with client-side routing and theme switching

This project serves as the foundation for a scalable academic management system.

---

## 🧰 Technologies Used

### 🔹 ASP.NET Core Web API

Framework used to build RESTful HTTP endpoints.

### 🔹 Entity Framework Core

ORM used to manage database operations and relationships.

### 🔹 SQL Server

Relational database used to store application data.

### 🔹 JWT Authentication

Used to authenticate users and protect API endpoints. The token is stored in an **HttpOnly cookie** — never exposed to JavaScript.

### 🔹 Role-Based Authorization

Restricts access to endpoints based on user roles such as **Admin**. Regular **User** accounts can view data but cannot create, edit, or delete records.

### 🔹 Swagger (OpenAPI)

Provides interactive API documentation and testing interface.

### 🔹 Hangfire

Used to schedule background recurring jobs.

### 🔹 LINQ

Used for optimized query projection and data shaping.

### 🔹 React + Vite

Frontend SPA with client-side routing (React Router), dark/light theme toggle, and Axios for API calls.

---

## 🔗 Entity Relationships

### ✔ One-to-Many

**Instructor → Courses**

### ✔ Many-to-Many

**Students ↔ Courses (via Enrollment)**

### ✔ One-to-One

**Instructor ↔ InstructorProfile**

---

## ⭐ Features

* CRUD operations for Students, Instructors, Courses
* Enrollment management system
* Instructor profile management
* DTO validation using Data Annotations
* Global exception handling middleware
* JWT authentication stored in HttpOnly cookies
* User registration system with persistent user accounts in the database
* Role-based endpoint protection (Admin vs User)
* Role-based UI — Add/Edit/Delete buttons hidden for non-admin users
* Protected frontend routes that redirect unauthenticated users to `/login`
* Optimized read-only queries using `AsNoTracking()`
* LINQ projection using `Select()`
* Background scheduled job to clean old enrollments
* React frontend with dark/light mode, form validation, and pre-filled edit forms

### 🆕 Additional Enhancements

* Duplicate student prevention using **email validation in the service layer**
* Real-time validation error display in the frontend
* Student enrollment with course selection dropdown
* Success feedback messages (enrollment, profile creation, etc.)
* Instructor profile creation and management UI

---

## 🔐 Authentication

### Login

```
POST /api/auth/login
```

Example Request:

```json
{
  "username": "admin",
  "password": "1234"
}
```

Example Response:

```json
{
  "message": "Login successful",
  "role": "Admin"
}
```

On successful login, the server sets an **HttpOnly cookie (`jwt`)** containing the token and returns the user's role.

---

### Registration

```
POST /api/auth/register
```

Users are stored in the database and assigned role **User**.

---

### Logout

```
POST /api/auth/logout
```

Clears the authentication cookie.

---

## 🛡 Role-Based Access

| Role  | Permissions      |
| ----- | ---------------- |
| Admin | Full CRUD access |
| User  | Read-only access |

---

## 🔒 Security Features

### Password Hashing

Passwords are hashed using **BCrypt** before storage:

* `BCrypt.HashPassword()` during registration
* `BCrypt.Verify()` during login

➡️ Plain passwords are never stored.

---

### Cookie-Based Authentication

* JWT stored in **HttpOnly cookie**
* Not accessible via JavaScript
* Automatically sent with requests

➡️ Protects against XSS attacks.

---

## 🌐 CORS Configuration

Configured in `Program.cs`:

* Allowed origin: `http://localhost:5173`
* `AllowCredentials()` enabled
* Supports full API communication with cookies

---

## 📡 API Endpoints

### Auth

* POST `/api/auth/login`
* POST `/api/auth/register`
* POST `/api/auth/logout`

### Students

* GET / POST / PUT / DELETE

### Courses

* GET / POST / PUT / DELETE

### Instructors

* GET / POST / PUT / DELETE

### Enrollment

* POST `/api/Enrollments`

---

## 🖥 Frontend

### Routes

| Route          | Page        |
| -------------- | ----------- |
| `/`            | Home        |
| `/login`       | Login       |
| `/register`    | Register    |
| `/students`    | Students    |
| `/courses`     | Courses     |
| `/instructors` | Instructors |

### Behavior

* Protected routes
* Role-based UI rendering
* Axios with `withCredentials: true`
* Persistent login using cookies

---

## ▶ How to Run

### Backend

```bash
dotnet ef database update
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🍪 Why Cookies?

* Secure (HttpOnly)
* Prevent token theft
* Automatic authentication handling

---

## ⏱ Background Job

Runs daily using Hangfire:

* Removes old enrollments
* Keeps database clean

---

## 📸 Application Screenshots

All screenshots are located in:

```
Screenshots/ApplicationScreenshots/
```

| Screenshot                        | Description           |
| --------------------------------- | --------------------- |
| HomePage1.png                     | Home page (dark mode) |
| HomePage2.png                     | Home cards section    |
| LightModeHomePage.png             | Light mode            |
| LoginPage(admin).png              | Login page            |
| RegisterPage.png                  | Register page         |
| StudentsList.png                  | Students list         |
| CoursesList.png                   | Courses list          |
| InstructorsList.png               | Instructors list      |
| AddNewStudent.png                 | Add student           |
| AddNewCourse.png                  | Add course            |
| AddNewInstructor.png              | Add instructor        |
| EditStudent.png                   | Edit student          |
| EditCourse.png                    | Edit course           |
| EditInstructor.png                | Edit instructor       |
| UserView_Students.png             | User view students    |
| UserView_Courses.png              | User view courses     |
| UserView_Instructors.png          | User view instructors |
| LoginValidation_WrongPassword.png | Login error           |

### 🆕 Additional Screenshots

| Screenshot                        | Description                |
| --------------------------------- | -------------------------- |
| AddStudentDuplicateValidation.png | Duplicate email validation |
| StudentEnrollmentDropdown.png     | Course dropdown            |
| StudentEnrollmentSuccess.png      | Enrollment success         |
| InstructorProfileCreated.png      | Profile creation           |
| InstructorsManagement.png         | Profile management         |

---

## 🧠 Architecture

```
Frontend (React)
        ↓
Controller
        ↓
Service Layer
        ↓
DbContext
        ↓
Database
```

---

## 🎯 Conclusion

This project demonstrates a complete full-stack system with:

* Secure authentication
* Clean architecture
* Full CRUD operations
* Role-based access control
* Real-world features (validation, background jobs, UI feedback)

It is designed as a scalable academic management solution.

---
