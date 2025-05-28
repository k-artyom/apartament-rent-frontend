// src/pages/UserProfilePage.js

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userApi } from '../utils/api'; // Для отримання профілю, обраних, видалення з обраних
import { isAuthenticated } from '../utils/auth'; // Для перевірки авторизації
import '../styles/userprofile.css'; // Стилі для сторінки профілю

function UserProfilePage({ currentUser }) {
  const { id } = useParams(); // Отримуємо ID користувача з URL
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [userRentals, setUserRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Функція для завантаження даних профілю користувача та його оренд
  const fetchData = useCallback(async () => {
    // Перевіряємо авторизацію та відповідність ID
    if (!isAuthenticated() || !currentUser || currentUser.id !== id) {
      alert('Ви не авторизовані або не маєте доступу до цього профілю.');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Отримуємо дані профілю (включаючи обрані квартири)
      const profileData = await userApi.getUserProfile(id);
      setUserProfile(profileData);

      // Отримуємо орендовані квартири користувача
      const rentalsData = await userApi.getUserRentals(id);
      setUserRentals(rentalsData);

    } catch (err) {
      setError(err.message || 'Не вдалося завантажити профіль користувача.');
      console.error('Error fetching user profile or rentals:', err);
    } finally {
      setLoading(false);
    }
  }, [id, currentUser, navigate]); // Додаємо currentUser в залежності

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Обробник видалення квартири з обраних
  const handleRemoveFavorite = async (apartmentId) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю квартиру з обраних?')) {
      return;
    }

    try {
      await userApi.removeFavorite(currentUser.id, apartmentId);
      alert('Квартиру успішно видалено з обраних!');
      // Оновлюємо дані профілю, щоб список обраних оновився
      fetchData();
    } catch (err) {
      alert(err.message || 'Помилка при видаленні з обраних.');
      console.error('Error removing favorite:', err);
    }
  };

  // Нова функція для переходу на сторінку деталізації
  const handleDetailsClick = (apartmentId) => {
    navigate(`/apartment/${apartmentId}`);
  };

  if (loading) {
    return <p className="container">Завантаження профілю...</p>;
  }

  if (error) {
    return <p className="container alert alert-danger">{error}</p>;
  }

  if (!userProfile) {
    return <p className="container">Профіль користувача не знайдено.</p>;
  }

  return (
    <div className="user-profile-page container">
      <h2 className="profile-greeting">Привіт, {userProfile.name}!</h2>

      {/* Секція "Обрані" */}
      <section className="favorites-section">
        <h3>Обрані квартири</h3>
        {userProfile.favorites && userProfile.favorites.length > 0 ? (
          <div className="table-responsive">
            <table className="profile-table">
              <thead>
                <tr>
                  <th>Фото</th>
                  <th>Назва</th>
                  <th>Місто</th>
                  <th>Ціна за день</th>
                  <th>Дія</th>
                </tr>
              </thead>
              <tbody>
                {userProfile.favorites.map(apartment => (
                  <tr key={apartment._id}>
                    <td><img src={apartment.image} alt={apartment.title} className="thumbnail-image" /></td>
                    <td>{apartment.title}</td>
                    <td>{apartment.city}</td>
                    <td>${apartment.pricePerDay}</td>
                    <td>
                      {/* Додаємо кнопку "Детальніше" */}
                      <button
                        onClick={() => handleDetailsClick(apartment._id)}
                        className="action-button primary-button small-button" // Додаємо клас small-button для стилів
                      >
                        Детальніше
                      </button>
                      <button onClick={() => handleRemoveFavorite(apartment._id)} className="remove-button">
                        Видалити з обраного
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Ще не обрано жодної квартири.</p>
        )}
      </section>

      {/* Секція "Орендовані" */}
      <section className="rentals-section">
        <h3>Орендовані квартири</h3>
        {userRentals && userRentals.length > 0 ? (
          <div className="table-responsive">
            <table className="profile-table">
              <thead>
                <tr>
                  <th>Фото</th>
                  <th>Назва</th>
                  <th>Місто</th>
                  <th>Дата початку</th>
                  <th>Кількість днів</th>
                  <th>Вартість</th>
                </tr>
              </thead>
              <tbody>
                {userRentals.map(rental => (
                  <tr key={rental._id}>
                    <td><img src={rental.apartment.image} alt={rental.apartment.title} className="thumbnail-image" /></td>
                    <td>{rental.apartment.title}</td>
                    <td>{rental.apartment.city}</td>
                    <td>{new Date(rental.startDate).toLocaleDateString('uk-UA')}</td>
                    <td>{rental.rentalDays}</td>
                    <td>${rental.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Ще не орендовано жодної квартири.</p>
        )}
      </section>
    </div>
  );
}

export default UserProfilePage;