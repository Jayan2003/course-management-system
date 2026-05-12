<!-- # 📘 Course Management System

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

--- -->


# 📘 EduTrack – Course Management System

## 📌 Project Description

EduTrack is a full-stack academic management system built using **ASP.NET Core Web API**, **Entity Framework Core**, **SQL Server**, and a **React (Vite)** frontend.

The platform supports three main roles:

- **Admin**
- **Student**
- **Instructor**

Each role has its own dashboard, permissions, and workflow.

The system allows:

- Students to register, enroll in courses, and view grades
- Instructors to manage assigned students and submit grades
- Admins to create and manage courses and assign instructors

The project demonstrates important Web Engineering and Full-Stack Development concepts including:

- JWT Authentication using HttpOnly cookies
- Role-based Authorization
- Entity relationships with Entity Framework Core
- Service-layer architecture using Dependency Injection
- Protected frontend routes
- Role-based React dashboards
- Background processing using Hangfire
- Full-stack API integration using Axios

The application is designed as a scalable academic management solution with secure authentication and modern UI/UX principles.

---

# 🧰 Technologies Used

## 🔹 ASP.NET Core Web API

Framework used to build RESTful HTTP endpoints.

## 🔹 Entity Framework Core

ORM used to manage database operations and relationships.

## 🔹 SQL Server

Relational database used to store application data.

## 🔹 JWT Authentication

Used to authenticate users and protect API endpoints. The token is stored in an **HttpOnly cookie** for improved security.

## 🔹 Role-Based Authorization

Restricts access to routes and API endpoints based on user role.

## 🔹 Swagger (OpenAPI)

Provides interactive API documentation and endpoint testing.

## 🔹 Hangfire

Used for recurring background jobs and scheduled cleanup tasks.

## 🔹 LINQ

Used for optimized query projection and data shaping.

## 🔹 React + Vite

Frontend SPA with client-side routing, Axios integration, protected routes, and dynamic dashboards.

---

# 🔗 Entity Relationships

## ✔ One-to-Many

- Instructor → Courses

## ✔ Many-to-Many

- Students ↔ Courses (via Enrollment)

## ✔ One-to-One

- User ↔ Student
- User ↔ Instructor

---

# ⭐ Features

## 🔐 Authentication & Authorization

- JWT Authentication using HttpOnly cookies
- Secure login/logout system
- BCrypt password hashing
- Role-based authorization
- Protected frontend routes

---

## 👨‍💼 Admin Features

- Create and manage courses
- Assign instructors to courses
- Access admin dashboard

---

## 👨‍🎓 Student Features

- Self-registration system
- Browse available courses
- Enroll in courses
- View enrollments
- View assigned grades
- Student dashboard

---

## 👨‍🏫 Instructor Features

- Self-registration system
- View assigned courses
- View enrolled students
- Assign grades to students
- Instructor dashboard

---

## ⚙ Backend Features

- Clean service-layer architecture
- DTO validation using Data Annotations
- Global exception handling
- LINQ query optimization
- Background jobs using Hangfire
- Entity Framework Core relationships

---

## 🎨 Frontend Features

- React SPA using React Router
- Role-based dashboards
- Dark/Light mode
- Axios API integration
- Protected routes
- Dynamic UI rendering

---

# 🔐 Authentication

## Login

```http
POST /api/auth/login
````

### Example Request

```json
{
  "username": "admin",
  "password": "1234"
}
```

### Example Response

```json
{
  "message": "Login successful",
  "role": "Admin"
}
```

On successful login, the server sets an **HttpOnly cookie (`jwt`)** containing the authentication token.

---

## Registration

```http
POST /api/auth/register
```

Users can register as:

* Student
* Instructor

Student and Instructor entities are automatically linked to the created user account.

---

## Logout

```http
POST /api/auth/logout
```

Clears the authentication cookie.

---

# 🛡 Role-Based Access

| Role       | Permissions                           |
| ---------- | ------------------------------------- |
| Admin      | Manage courses and assign instructors |
| Student    | Enroll in courses and view grades     |
| Instructor | Manage assigned students and grades   |

---

# 🔒 Security Features

## Password Hashing

Passwords are hashed using **BCrypt** before storage.

### Registration

```csharp
BCrypt.Net.BCrypt.HashPassword(password)
```

### Login Verification

```csharp
BCrypt.Net.BCrypt.Verify(password, hashedPassword)
```

Plain-text passwords are never stored in the database.

---

## Cookie-Based Authentication

* JWT stored in HttpOnly cookie
* Not accessible via JavaScript
* Automatically sent with requests

This protects against token theft and XSS attacks.

---

# 🌐 CORS Configuration

Configured in `Program.cs`:

* Allowed origin: `http://localhost:5173`
* `AllowCredentials()` enabled
* Supports secure frontend/backend communication using cookies

---

# 📡 API Endpoints

## 🔐 Authentication

* POST `/api/auth/login`
* POST `/api/auth/register`
* POST `/api/auth/logout`

---

## 📚 Courses

* GET `/api/courses`
* POST `/api/courses`
* PUT `/api/courses/{id}`
* DELETE `/api/courses/{id}`

---

## 👨‍🎓 Enrollments

* POST `/api/enrollments/{courseId}`
* GET `/api/enrollments/my`

---

## 👨‍🏫 Instructor

* GET `/api/enrollments/instructor/students`
* GET `/api/enrollments/instructor/courses`
* PUT `/api/enrollments/grade`

---

# 🖥 Frontend

## Routes

| Route             | Description          |
| ----------------- | -------------------- |
| `/`               | Role-based dashboard |
| `/login`          | Login page           |
| `/register`       | Registration page    |
| `/courses`        | Courses page         |
| `/my-enrollments` | Student enrollments  |
| `/my-courses`     | Instructor courses   |
| `/my-students`    | Instructor students  |

---

## Frontend Behavior

* Protected routes
* Role-based dashboards
* Dynamic navbar rendering
* Axios with `withCredentials: true`
* Persistent authentication using cookies
* Responsive UI
* Dark/Light theme toggle

---

# ▶ How to Run

## Backend

```bash
dotnet ef database update
dotnet run
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🍪 Why HttpOnly Cookies?

* More secure than localStorage
* Prevent token theft
* Protect against XSS attacks
* Automatic authentication handling

---

# ⏱ Background Jobs

Hangfire is used to run recurring jobs.

### Current Job

* Automatically removes old enrollments from the database

---

# 📸 Application Screenshots

All screenshots are located in:

```text
Screenshots/ApplicationScreenshots/
```

## Suggested Screenshots

| Screenshot             | Description                 |
| ---------------------- | --------------------------- |
| HomePage.png           | Role-based dashboard        |
| LoginPage.png          | Login page                  |
| RegisterPage.png       | Registration page           |
| CoursesPage.png        | Courses list                |
| StudentEnrollments.png | Student enrollments         |
| InstructorStudents.png | Instructor grading page     |
| InstructorCourses.png  | Instructor assigned courses |
| AdminCourses.png       | Admin course management     |
| DarkMode.png           | Dark mode UI                |

---

# 🧠 Architecture

```text
Frontend (React)
        ↓
Controllers
        ↓
Service Layer
        ↓
DbContext
        ↓
SQL Server Database
```

---

# 🎯 Conclusion

EduTrack demonstrates a complete modern full-stack academic management platform with:

* Secure JWT authentication
* Role-based authorization
* Real-world enrollment workflows
* Instructor grading system
* Student dashboards
* Instructor dashboards
* Clean architecture principles
* Full-stack API integration

The project combines backend engineering, frontend development, database management, authentication, and scalable software architecture into a professional academic management solution.

```
