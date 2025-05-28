// src/pages/RegisterPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../utils/api';
import { saveUser } from '../utils/auth';
import '../styles/forms.css';

function RegisterPage({ onRegister }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проста клієнтська валідація
    if (!name || !phoneNumber || !password) {
      setError('Будь ласка, заповніть всі поля.');
      return;
    }
    // Валідація: номер телефону не може містити літери
    if (/[a-zA-Z]/.test(phoneNumber)) {
        setError('Номер телефону не може містити літери.');
        return;
    }
    // Додаткова валідація для пароля (наприклад, мінімальна довжина)
    if (password.length < 6) {
      setError('Пароль повинен містити щонайменше 6 символів.');
      return;
    }

    try {
      setError('');
      setSuccess('');

      const response = await authApi.register({ name, phoneNumber, password });

      if (response.user) {
        saveUser(response.user); // Зберігаємо дані користувача в localStorage
        onRegister(response.user); // Передаємо дані користувача в App.js
        setSuccess(response.message || 'Реєстрація успішна!');
        navigate('/'); // Перенаправляємо на головну сторінку
      }
    } catch (err) {
      setError(err.message || 'Помилка реєстрації. Спробуйте ще раз.');
      console.error('Помилка реєстрації:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label htmlFor="name">Ім'я</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введіть ваше ім'я"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="regPhoneNumber">Номер телефону</label>
          <input
            type="tel"
            id="regPhoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Введіть номер телефону"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="regPassword">Пароль</label>
          <input
            type="password"
            id="regPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введіть пароль"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Зареєструватись</button>
        </div>
      </form>
      <p className="form-switch-link">
        Вже є акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;