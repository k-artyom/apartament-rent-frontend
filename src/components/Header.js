// src/components/Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link для навігації, useNavigate для програмної навігації
import { isAuthenticated } from '../utils/auth'; // Імпортуємо функцію для перевірки авторизації
import '../styles/Header.css'; // Імпортуємо стилі для хедера

function Header({ currentUser, onLogout }) {
  const navigate = useNavigate(); // Хук для програмної навігації

  // Обробник натискання кнопки "Профіль"
  const handleProfileClick = () => {
    if (isAuthenticated() && currentUser) {
      // Якщо користувач авторизований, переходимо на сторінку його профілю
      navigate(`/user/${currentUser.id}`);
    } else {
      // Якщо не авторизований, переходимо на сторінку входу
      navigate('/login');
    }
  };

  // Обробник натискання кнопки "Увійти"
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="header-content container">
        <div className="logo-section">
          <Link to="/" className="logo-link">
            {/* Шлях до логотипу відносно папки `public` */}
            <img src="/logo.png" alt="Apartment Rent Logo" className="logo-image" />
            <span className="logo-text">Apartment Rent</span>
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <button onClick={handleProfileClick} className="nav-button">
                Профіль
              </button>
            </li>
            {/* Кнопка "Увійти" або "Вийти" в залежності від статусу авторизації */}
            <li>
              {currentUser ? (
                // Якщо користувач авторизований, показуємо кнопку "Вийти"
                <button onClick={onLogout} className="nav-button">
                  Вийти
                </button>
              ) : (
                // Якщо не авторизований, показуємо кнопку "Увійти"
                <button onClick={handleLoginClick} className="nav-button">
                  Увійти
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;