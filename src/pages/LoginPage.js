// src/pages/LoginPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../utils/api'; // Імпортуємо функції для API запитів
import { saveUser } from '../utils/auth'; // Імпортуємо функцію для збереження користувача в localStorage
import '../styles/forms.css'; // Загальні стилі для форм

function LoginPage({ onLogin }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Для відображення помилок
  const [success, setSuccess] = useState(''); // Для відображення повідомлень про успіх (хоча для входу це менш типово)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Запобігаємо стандартній поведінці форми

    // Проста клієнтська валідація
    if (!phoneNumber || !password) {
      setError('Будь ласка, заповніть всі поля.');
      return;
    }
    // Валідація: номер телефону не може містити літери
    if (/[a-zA-Z]/.test(phoneNumber)) {
        setError('Номер телефону не може містити літери.');
        return;
    }

    try {
      setError(''); // Очищаємо попередні помилки
      setSuccess(''); // Очищаємо попередні повідомлення про успіх

      // Викликаємо функцію входу з нашого API
      const response = await authApi.login({ phoneNumber, password });

      // Якщо вхід успішний
      if (response.user) {
        saveUser(response.user); // Зберігаємо дані користувача в localStorage
        onLogin(response.user); // Передаємо дані користувача в App.js
        setSuccess(response.message || 'Вхід успішний!');
        navigate('/'); // Перенаправляємо на головну сторінку
      }
    } catch (err) {
      // Обробка помилок, які прийшли з бекенду або мережеві помилки
      setError(err.message || 'Помилка входу. Спробуйте ще раз.');
      console.error('Помилка входу:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label htmlFor="phoneNumber">Номер телефону</label>
          <input
            type="tel" // Використовуємо tel для семантики номера телефону
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Введіть номер телефону"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введіть пароль"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Увійти</button>
        </div>
      </form>
      <p className="form-switch-link">
        Ще немає акаунта? <Link to="/register">Зареєструватись</Link>
      </p>
    </div>
  );
}

export default LoginPage;