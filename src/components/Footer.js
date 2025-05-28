// src/components/Footer.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link для навігації
import '../styles/Footer.css'; // Імпортуємо стилі для футера

function Footer({ currentUser, onLogout }) {
  const navigate = useNavigate();

  // Обробник натискання кнопки "Увійти як адміністратор"
  const handleAdminLogin = () => {
    const password = prompt('Введіть пароль адміністратора:');
    if (password === 'admin123') { // Перевірка пароля адміністратора
      navigate('/admin-dashboard'); // Перехід на адмін-панель
    } else if (password !== null) { // Якщо користувач не натиснув "Скасувати"
      alert('Невірний пароль адміністратора!');
    }
  };

  // Обробник для кнопки "Профіль" (аналогічно хедеру)
  const handleProfileClick = () => {
    if (currentUser) { // Перевіряємо, чи є користувач
      navigate(`/user/${currentUser.id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-content container">
        <nav className="footer-nav">
          <ul>
            <li><Link to="/" className="footer-link">На головну</Link></li>
            <li><Link to="/login" className="footer-link">Увійти</Link></li>
            <li><button onClick={handleProfileClick} className="footer-button-link">Профіль</button></li>
            <li><button onClick={handleAdminLogin} className="footer-button-link">Увійти як адміністратор</button></li>
          </ul>
        </nav>
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} Apartment Rent. Всі права захищені.</p>
          <p>Телефон: +38 (097) 123-45-67</p>
          <p>Адреса: вул. Квартирна, 10, м. Квартирівка</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;