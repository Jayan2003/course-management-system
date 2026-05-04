
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

The system implements the required database relationships:

### ✔ One-to-Many

**Instructor → Courses**

One instructor can teach multiple courses.

### ✔ Many-to-Many

**Students ↔ Courses (via Enrollment)**

Students can enroll in multiple courses and courses can contain multiple students.

### ✔ One-to-One

**Instructor ↔ InstructorProfile**

Each instructor has exactly one profile containing additional information.

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

On successful login, the server sets an **HttpOnly cookie** (`jwt`) containing the token and returns the user's **role** in the response body. The role is stored in `localStorage` by the frontend for UI control.

All protected endpoints are authenticated automatically — the browser sends the cookie with every request. **No `Authorization` header is needed or used by the frontend.**

### Registration

New users can self-register via:

```
POST /api/auth/register
```

Example Request:

```json
{
  "username": "john",
  "password": "pass123",
  "name": "John Doe"
}
```

Registered users are stored in the `Users` table and are assigned the **"User"** role on login. The built-in `admin / 1234` account is assigned the **"Admin"** role.

### Logout

```
POST /api/auth/logout
```

Clears the HttpOnly cookie server-side.

---

## 🛡 Role-Based Access

The system has two roles:

| Role  | Permissions |
|-------|-------------|
| **Admin** | Can view, create, edit, and delete all data. Full access to all API endpoints and frontend actions. |
| **User**  | Can only view data. Add, Edit, and Delete buttons are hidden on the frontend. Write API endpoints return `403 Forbidden` if called directly. |

**How role is determined:**

* `admin / 1234` → role `"Admin"`
* Any account registered via `/api/auth/register` → role `"User"`

**How role is stored on the frontend:**

* The login response body includes `"role": "Admin"` or `"role": "User"`
* The frontend saves this value to `localStorage` as `userRole`
* All list pages (`StudentsPage`, `CoursesPage`, `InstructorsPage`) read `role` from state and conditionally render admin-only controls

---

## 🔒 Security Features

### Password Hashing

User passwords are hashed using BCrypt before being stored in the database. The plain text password is never saved — only the BCrypt hash is stored.

- Library used: BCrypt.Net-Next
- On registration: password is hashed with `BCrypt.HashPassword()`
- On login: password is verified with `BCrypt.Verify(plainText, hash)`
- The admin fallback account (`admin/1234`) is separate from the database users

This means even if the database is compromised, user passwords cannot be read.

---

## 🌐 CORS Configuration

CORS is configured in `Program.cs` to allow the React frontend to communicate with the backend.

Key settings:

* **Allowed origin:** `http://localhost:5173` (Vite dev server)
* **`AllowCredentials()`** is enabled so the browser includes the HttpOnly cookie on cross-origin requests
* **Allowed methods/headers:** all, to support GET, POST, PUT, DELETE with JSON bodies

Without `AllowCredentials()` and a matching allowed origin, the browser would block cookie transmission on every API call.

---

## 📡 API Endpoint Documentation

### 🔑 Auth

| Method | Endpoint               | Description                        | Auth Required |
| ------ | ---------------------- | ---------------------------------- | ------------- |
| POST   | `/api/auth/login`      | Login and receive JWT cookie + role | ❌ Public    |
| POST   | `/api/auth/register`   | Register a new user (role: User)   | ❌ Public     |
| POST   | `/api/auth/logout`     | Logout and clear JWT cookie        | ❌ Public     |

---

### 👨‍🎓 Students

| Method | Endpoint             | Description            | Auth Required |
| ------ | -------------------- | ---------------------- | ------------- |
| GET    | `/api/Students`      | Retrieve all students  | ✅ Any role   |
| GET    | `/api/Students/{id}` | Retrieve student by ID | ✅ Any role   |
| POST   | `/api/Students`      | Create new student     | ✅ Admin      |
| PUT    | `/api/Students/{id}` | Update student         | ✅ Admin      |
| DELETE | `/api/Students/{id}` | Delete student         | ✅ Admin      |

---

### 📚 Courses

| Method | Endpoint            | Description           | Auth Required |
| ------ | ------------------- | --------------------- | ------------- |
| GET    | `/api/Courses`      | Retrieve all courses  | ✅ Any role   |
| GET    | `/api/Courses/{id}` | Retrieve course by ID | ✅ Any role   |
| POST   | `/api/Courses`      | Create new course     | ✅ Admin      |
| PUT    | `/api/Courses/{id}` | Update course         | ✅ Admin      |
| DELETE | `/api/Courses/{id}` | Delete course         | ✅ Admin      |

---

### 👨‍🏫 Instructors

| Method | Endpoint                | Description               | Auth Required |
| ------ | ----------------------- | ------------------------- | ------------- |
| GET    | `/api/Instructors`      | Retrieve all instructors  | ✅ Any role   |
| GET    | `/api/Instructors/{id}` | Retrieve instructor by ID | ✅ Any role   |
| POST   | `/api/Instructors`      | Create instructor         | ✅ Admin      |
| PUT    | `/api/Instructors/{id}` | Update instructor         | ✅ Admin      |
| DELETE | `/api/Instructors/{id}` | Delete instructor         | ✅ Admin      |

---

### 🧾 Enrollments

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/Enrollments` | Enroll student in course |

Example Request:

```json
{
  "studentId": 1,
  "courseId": 1
}
```

---

### 🪪 Instructor Profile

| Method | Endpoint                  | Description               |
| ------ | ------------------------- | ------------------------- |
| POST   | `/api/InstructorProfiles` | Create instructor profile |

---

## 🖥 Frontend

### Frontend Routes

| Route              | Page               | Description                        |
| ------------------ | ------------------ | ---------------------------------- |
| `/`                | HomePage           | Landing page (protected)           |
| `/login`           | LoginPage          | Login form (public)                |
| `/register`        | RegisterPage       | User registration form (public)    |
| `/students`        | StudentsPage       | List all students (protected)      |
| `/students/new`    | StudentFormPage    | Create student (protected)         |
| `/students/:id`    | StudentFormPage    | Edit student (protected)           |
| `/courses`         | CoursesPage        | List all courses (protected)       |
| `/courses/new`     | CourseFormPage     | Create course (protected)          |
| `/courses/:id`     | CourseFormPage     | Edit course (protected)            |
| `/instructors`     | InstructorsPage    | List all instructors (protected)   |
| `/instructors/new` | InstructorFormPage | Create instructor (protected)      |
| `/instructors/:id` | InstructorFormPage | Edit instructor (protected)        |

### Authentication Flow

1. User submits credentials via `POST /api/auth/login`
2. Backend validates, sets an **HttpOnly cookie** (`jwt`), and returns the user's **role** in the response body
3. Frontend saves `loggedIn: true` and `userRole: <role>` to `localStorage`
4. Axios is configured with `withCredentials: true` — the browser includes the cookie automatically on every subsequent request
5. All routes except `/login` and `/register` are wrapped in `ProtectedRoute` — unauthenticated users are redirected to `/login`
6. List pages read `role` from state: **Admin** sees Add/Edit/Delete controls, **User** sees read-only tables
7. When a new user registers via `/register`, role `"User"` is saved to `localStorage` automatically
8. On logout, `POST /api/auth/logout` clears the cookie server-side and `loggedIn` / `userRole` are removed from `localStorage`

### API Routes Used by Frontend

| Purpose     | Endpoints                                                              |
| ----------- | ---------------------------------------------------------------------- |
| Auth        | `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/logout` |
| Students    | `GET/POST/PUT/DELETE /api/Students`, `GET /api/Students/{id}`          |
| Courses     | `GET/POST/PUT/DELETE /api/Courses`, `GET /api/Courses/{id}`            |
| Instructors | `GET/POST/PUT/DELETE /api/Instructors`, `GET /api/Instructors/{id}`    |

---

## ▶ How to Run the Project

Both the backend and frontend must run simultaneously.

### Backend

1️⃣ Install prerequisites:

* .NET 8 SDK
* SQL Server

2️⃣ Update the connection string in `Program.cs`.

3️⃣ Apply database migrations:

```
dotnet ef database update
```

4️⃣ Start the backend (runs on port **5043**):

```
dotnet run
```

5️⃣ Open Swagger UI:

```
http://localhost:5043/swagger
```

6️⃣ Open Hangfire Dashboard:

```
http://localhost:5043/hangfire
```

### Frontend

1️⃣ Navigate to the frontend folder:

```
cd frontend
```

2️⃣ Install dependencies:

```
npm install
```

3️⃣ Start the dev server (runs on port **5173**):

```
npm run dev
```

4️⃣ Open the app in a browser:

```
http://localhost:5173
```

> The frontend proxies API requests to `http://localhost:5043` — both servers must be running at the same time.

---

## 🍪 Why HTTP-Only Cookies Improve Security

HTTP-Only cookies prevent authentication tokens from being accessed through client-side JavaScript.

This significantly reduces the risk of:

* Cross-Site Scripting (XSS) attacks
* Token theft
* Session hijacking

Because the browser automatically sends cookies with requests, they provide a safer industry-standard approach for session management.

---

## ⏱ Background Job

A recurring Hangfire job runs daily to:

✔ Remove enrollments older than 90 days
✔ Keep the database clean
✔ Improve system performance

---

## 📸 Application Screenshots

All screenshots are located in the `Screenshots/ApplicationScreenshots/` folder.

| Screenshot | Description |
|---|---|
| `HomePage1.png` | Home page hero section (dark mode) |
| `HomePage2.png` | Home page cards section (dark mode) |
| `LightModeHomePage.png` | Home page in light mode |
| `LoginPage(admin).png` | Login page with admin credentials and Register link |
| `RegisterPage.png` | Registration form - empty |
| `RegisterPage_Filled.png` | Registration form - filled in |
| `StudentsList.png` | Students list as Admin (Edit/Delete visible) |
| `CoursesList.png` | Courses list as Admin (Edit/Delete visible) |
| `InstructorsList.png` | Instructors list as Admin (Edit/Delete visible) |
| `AddNewStudent.png` | Add new student form |
| `AddNewCourse.png` | Add new course form with instructor dropdown |
| `AddNewInstructor.png` | Add new instructor form |
| `EditStudent.png` | Edit student form pre-filled |
| `EditCourse.png` | Edit course form pre-filled |
| `EditInstructor.png` | Edit instructor form pre-filled |
| `UserView_Students.png` | Students list as regular User (no buttons) |
| `UserView_Courses.png` | Courses list as regular User (no buttons) |
| `UserView_Instructors.png` | Instructors list as regular User (no buttons) |
| `LoginValidation_WrongPassword.png` | Login page showing error for invalid credentials |

---
