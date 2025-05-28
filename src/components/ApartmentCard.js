// src/components/ApartmentCard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../utils/api'; // Для додавання/видалення з обраних
import { isAuthenticated } from '../utils/auth'; // Для перевірки авторизації
import '../styles/apartmentcard.css'; // Стилі для картки квартири

function ApartmentCard({ apartment, currentUser, onFavoriteChange }) {
  const navigate = useNavigate();

  // Обробник натискання кнопки "Детальніше"
  const handleDetailsClick = () => {
    if (isAuthenticated()) {
      navigate(`/apartment/${apartment._id}`); // Перехід на сторінку деталізації квартири
    } else {
      navigate('/login'); // Якщо не авторизований, перехід на сторінку входу
    }
  };

  // Обробник натискання кнопки "Додати в обране"
  const handleAddToFavorites = async () => {
    if (!isAuthenticated() || !currentUser) {
      navigate('/login'); // Якщо не авторизований, перехід на сторінку входу
      return;
    }

    try {
      // Викликаємо API для додавання до обраних
      await userApi.addFavorite(currentUser.id, apartment._id);
      alert('Квартиру додано до обраних!');
      // Якщо є функція зворотного виклику, викликаємо її, щоб оновити стан на батьківському компоненті
      if (onFavoriteChange) {
        onFavoriteChange(apartment._id, true);
      }
    } catch (error) {
      alert(error.message || 'Помилка при додаванні до обраних.');
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div className="apartment-card">
      <img src={apartment.image} alt={apartment.title} className="apartment-card-image" />
      <div className="apartment-card-body">
        <h3 className="apartment-card-title">{apartment.title}</h3>
        <p className="apartment-card-text"><strong>Місто:</strong> {apartment.city}</p>
        <p className="apartment-card-text"><strong>Кімнати:</strong> {apartment.rooms}</p>
        <p className="apartment-card-text"><strong>Площа:</strong> {apartment.area} м²</p>
        <p className="apartment-card-price"><strong>Ціна за день:</strong> ${apartment.pricePerDay}</p>
        <div className="apartment-card-actions">
          <button onClick={handleAddToFavorites} className="card-button primary-button">Додати в обране</button>
          <button onClick={handleDetailsClick} className="card-button secondary-button">Детальніше</button>
        </div>
      </div>
    </div>
  );
}

export default ApartmentCard;