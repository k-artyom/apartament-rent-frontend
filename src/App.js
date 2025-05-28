// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ApartmentDetailsPage from './pages/ApartmentDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { getCurrentUser, logout } from './utils/auth'; // Функції для роботи з сесіями
import './styles/App.css'; // Загальні стилі для App
import './index.css'; // Імпортуємо глобальні стилі

function App() {
  // Стан для зберігання інформації про поточного користувача
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect для завантаження даних користувача при завантаженні компонента
  useEffect(() => {
    // Отримуємо поточного користувача з localStorage або cookie (залежить від реалізації auth.js)
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Функція для оновлення стану користувача після входу/реєстрації
  const handleLoginRegister = (user) => {
    setCurrentUser(user);
  };

  // Функція для виходу користувача
  const handleLogout = () => {
    logout(); // Видаляємо дані користувача з localStorage/cookie
    setCurrentUser(null); // Очищаємо стан користувача
  };

  return (
    <Router>
      <div className="app-container">
        {/* Передаємо currentUser та handleLogout у Header */}
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            {/* Маршрут для головної сторінки */}
            <Route path="/" element={<HomePage currentUser={currentUser} />} />
            {/* Маршрут для сторінки входу */}
            <Route path="/login" element={<LoginPage onLogin={handleLoginRegister} />} />
            {/* Маршрут для сторінки реєстрації */}
            <Route path="/register" element={<RegisterPage onRegister={handleLoginRegister} />} />
            {/* Маршрут для сторінки деталізації квартири */}
            <Route path="/apartment/:id" element={<ApartmentDetailsPage currentUser={currentUser} />} />
            {/* Маршрут для сторінки профілю користувача */}
            <Route path="/user/:id" element={<UserProfilePage currentUser={currentUser} />} />
            {/* Маршрут для адмін-панелі */}
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          </Routes>
        </main>
        {/* Передаємо currentUser у Footer (якщо потрібно) */}
        <Footer currentUser={currentUser} onLogout={handleLogout} />
      </div>
    </Router>
  );
}

export default App;