// src/pages/ApartmentDetailsPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apartmentApi, rentalApi } from '../utils/api'; // Імпортуємо API для квартир та оренд
import { isAuthenticated } from '../utils/auth'; // Для перевірки авторизації
import '../styles/apartmentdetails.css'; // Стилі для сторінки деталізації
import 'react-datepicker/dist/react-datepicker.css'; // Стилі для datepicker
import DatePicker from 'react-datepicker'; // Імпортуємо DatePicker

function ApartmentDetailsPage({ currentUser }) {
  const { id } = useParams(); // Отримуємо ID квартири з URL
  const navigate = useNavigate();

  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState(new Date()); // Дата початку оренди
  const [rentalDays, setRentalDays] = useState(1); // Кількість днів оренди
  const [totalCost, setTotalCost] = useState(0); // Загальна вартість оренди

  useEffect(() => {
    // Перевіряємо авторизацію при завантаженні сторінки
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Функція для завантаження даних квартири
    const fetchApartment = async () => {
      try {
        const data = await apartmentApi.getApartmentById(id);
        setApartment(data);
        // Ініціалізуємо загальну вартість при завантаженні квартири
        setTotalCost(data.pricePerDay * rentalDays);
      } catch (err) {
        setError(err.message || 'Не вдалося завантажити інформацію про квартиру.');
        console.error('Error fetching apartment details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [id, navigate, rentalDays]); // Додаємо rentalDays в залежності, щоб оновлювати totalCost

  // Оновлюємо загальну вартість при зміні кількості днів або ціни квартири
  useEffect(() => {
    if (apartment && rentalDays > 0) {
      setTotalCost(apartment.pricePerDay * rentalDays);
    }
  }, [rentalDays, apartment]);


  // Обробник зміни кількості днів оренди
  const handleRentalDaysChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setRentalDays(value);
    } else if (e.target.value === '') {
      setRentalDays(''); // Дозволити порожнє поле під час введення
      setTotalCost(0);
    } else {
      setRentalDays(1); // За замовчуванням 1, якщо введено некоректне значення
    }
  };

  // Обробник форми оренди
  const handleRentSubmit = async (e) => {
    e.preventDefault();

    // Клієнтська валідація
    if (!currentUser || !apartment) {
      alert('Будь ласка, увійдіть, щоб орендувати квартиру.');
      navigate('/login');
      return;
    }
    if (!startDate || !rentalDays || rentalDays <= 0) {
      alert('Будь ласка, оберіть дату початку та введіть коректну кількість днів оренди.');
      return;
    }
    if (isNaN(rentalDays) || rentalDays < 1) {
      alert('Кількість днів оренди повинна бути числом більше 0.');
      return;
    }

    // Створюємо об'єкт з даними оренди
    const rentalData = {
      userId: currentUser.id,
      apartmentId: apartment._id,
      startDate: startDate.toISOString(), // Перетворюємо дату в ISO рядок
      rentalDays,
      totalPrice: totalCost,
    };

    try {
      await rentalApi.createRental(rentalData);
      alert('Успішно орендовано!');
      navigate(`/user/${currentUser.id}`); // Перенаправляємо на сторінку профілю після успішної оренди
    } catch (err) {
      alert(err.message || 'Помилка при оформленні оренди. Спробуйте ще раз.');
      console.error('Error creating rental:', err);
    }
  };

  if (loading) {
    return <p className="container">Завантаження інформації про квартиру...</p>;
  }

  if (error) {
    return <p className="container alert alert-danger">{error}</p>;
  }

  if (!apartment) {
    return <p className="container">Квартиру не знайдено.</p>;
  }

  return (
    <div className="apartment-details-page container">
      <div className="apartment-details-content">
        {/* Секція інформації про квартиру */}
        <section className="apartment-info">
          <img src={apartment.image} alt={apartment.title} className="apartment-info-image" />
          <h2 className="apartment-info-title">{apartment.title}</h2>
          <p className="apartment-info-description">{apartment.description}</p>
          <div className="apartment-info-grid">
            <p><strong>Місто:</strong> {apartment.city}</p>
            <p><strong>Кількість кімнат:</strong> {apartment.rooms}</p>
            <p><strong>Площа:</strong> {apartment.area} м²</p>
            <p><strong>Ціна за день:</strong> ${apartment.pricePerDay}</p>
          </div>
        </section>

        {/* Форма для оренди */}
        <section className="rental-form-section">
          <h3>Орендувати квартиру</h3>
          <form onSubmit={handleRentSubmit} className="rental-form">
            <div className="form-group">
              <label htmlFor="userName">Ваше ім'я:</label>
              <input
                type="text"
                id="userName"
                value={currentUser?.name || ''} // Відображаємо ім'я користувача, якщо він авторизований
                readOnly // Поле тільки для читання
                className="read-only-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userPhone">Ваш номер телефону:</label>
              <input
                type="text"
                id="userPhone"
                value={currentUser?.phoneNumber || ''} // Відображаємо номер телефону
                readOnly
                className="read-only-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Дата початку оренди:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()} // Забороняємо вибір минулих дат
                className="date-picker-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="rentalDays">Кількість днів оренди:</label>
              <input
                type="number"
                id="rentalDays"
                value={rentalDays}
                onChange={handleRentalDaysChange}
                min="1"
                placeholder="Кількість днів"
                required
              />
            </div>
            <div className="form-group">
              <label>Загальна вартість:</label>
              <p className="total-cost-display">${totalCost.toFixed(2)}</p>
            </div>
            <button type="submit" className="rent-button">Орендувати</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ApartmentDetailsPage;