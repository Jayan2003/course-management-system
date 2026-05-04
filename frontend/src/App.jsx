import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import StudentsPage from './pages/StudentsPage'
import StudentFormPage from './pages/StudentFormPage'
import CoursesPage from './pages/CoursesPage'
import CourseFormPage from './pages/CourseFormPage'
import InstructorsPage from './pages/InstructorsPage'
import InstructorFormPage from './pages/InstructorFormPage'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true')
  const [role, setRole] = useState(() => localStorage.getItem('userRole') || '')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <BrowserRouter>
      <div data-theme={theme}>
        <Navbar toggleTheme={toggleTheme} theme={theme} setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><HomePage /></ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><StudentsPage role={role} /></ProtectedRoute>
            } />
            <Route path="/students/new" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><StudentFormPage /></ProtectedRoute>
            } />
            <Route path="/students/:id" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><StudentFormPage /></ProtectedRoute>
            } />
            <Route path="/courses" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><CoursesPage role={role} /></ProtectedRoute>
            } />
            <Route path="/courses/new" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><CourseFormPage /></ProtectedRoute>
            } />
            <Route path="/courses/:id" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><CourseFormPage /></ProtectedRoute>
            } />
            <Route path="/instructors" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><InstructorsPage role={role} /></ProtectedRoute>
            } />
            <Route path="/instructors/new" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><InstructorFormPage /></ProtectedRoute>
            } />
            <Route path="/instructors/:id" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}><InstructorFormPage /></ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
