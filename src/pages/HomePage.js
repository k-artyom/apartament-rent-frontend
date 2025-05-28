// src/pages/HomePage.js

import React, { useState, useEffect, useCallback } from 'react';
import ApartmentCard from '../components/ApartmentCard';
import { apartmentApi } from '../utils/api';
import { cities } from '../utils/seedData';
import '../styles/homepage.css'; // Стилі для головної сторінки

function HomePage({ currentUser }) {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Стан для фільтрів, пошуку та сортування
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Всі');
  const [selectedRooms, setSelectedRooms] = useState('Будь яка кількість');
  const [sortByPrice, setSortByPrice] = useState('Без сортування');

  // Стан для пагінації
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apartmentsPerPage = 6; // Кількість квартир на сторінку

  // Масиви для динамічного відображення варіантів фільтрів
  // const cities = ["Всі", "Тернопіль", "Київ", "Суми", "Львів"];
  const roomOptions = ["Будь яка кількість", "1 кімната", "2 кімнати", "3 кімнати"];
  const sortOptions = ["Без сортування", "спочатку дешевше", "спочатку дорожче"];

  // Функція для завантаження квартир з бекенду
  const fetchApartments = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page: currentPage,
        limit: apartmentsPerPage,
        search: searchQuery,
        city: selectedCity,
        rooms: selectedRooms === 'Будь яка кількість' ? '' : selectedRooms.split(' ')[0], // Витягуємо число кімнат
        sortByPrice: sortByPrice === 'Без сортування' ? '' : sortByPrice,
      };
      const data = await apartmentApi.getApartments(params);
      setApartments(data.apartments);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || 'Не вдалося завантажити квартири.');
      console.error('Error fetching apartments:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, selectedCity, selectedRooms, sortByPrice]);

  // Викликаємо функцію завантаження при зміні параметрів фільтрів/пагінації
  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  // Обробник натискання кнопки "Шукати"
  const handleSearch = () => {
    setCurrentPage(1); // При новому пошуку завжди повертаємось на першу сторінку
    fetchApartments();
  };

  // Обробники для пагінації
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Функція для оновлення обраних квартир користувача (викликається з ApartmentCard)
  const handleFavoriteChange = (apartmentId, isAdded) => {
    // У цьому випадку, для простоти, ми не будемо оновлювати стан `apartments`
    // оскільки зміна "обраного" статусу не впливає на відображення картки.
    // Якщо б ми мали індикатор "обрано" прямо на картці, тоді потрібно було б оновити стан.
    // Натомість, оновлення відбудеться на сторінці профілю при її завантаженні.
  };


  return (
    <div className="home-page">
      {/* Hero секція */}
      <section className="hero-section" style={{ backgroundImage: `url('/hero-bg.jpg')` }}>
        <div className="hero-content container">
          <h1>Знайдіть квартиру своєї мрії</h1>
          <p>Оренда житла стала простішою, ніж будь-коли!</p>
        </div>
      </section>

      <div className="container">
        {/* Панель фільтрів, сортування та пошуку */}
        <section className="filters-panel">
          <input
            type="text"
            placeholder="Пошук за назвою або описом..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-input"
          />

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="filter-select"
          >
            {/* Додаємо опцію "Всі", а потім мапуємо міста з seedData */}
            <option value="Всі">Всі</option>
            {cities.map((city, index) => ( // Використовуємо імпортований `cities`
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          {/* <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="filter-select"
          >
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select> */}

          <select
            value={selectedRooms}
            onChange={(e) => setSelectedRooms(e.target.value)}
            className="filter-select"
          >
            {roomOptions.map((rooms, index) => (
              <option key={index} value={rooms}>{rooms}</option>
            ))}
          </select>

          <select
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
            className="filter-select"
          >
            {sortOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>

          <button onClick={handleSearch} className="filter-button">Шукати</button>
        </section>

        {/* Галерея карток квартир */}
        <section className="apartment-gallery">
          {loading ? (
            <p>Завантаження квартир...</p>
          ) : error ? (
            <p className="alert alert-danger">{error}</p>
          ) : apartments.length === 0 ? (
            <p>Немає квартир, що відповідають вашим критеріям.</p>
          ) : (
            <div className="apartment-grid">
              {apartments.map(apartment => (
                <ApartmentCard
                  key={apartment._id}
                  apartment={apartment}
                  currentUser={currentUser}
                  onFavoriteChange={handleFavoriteChange}
                />
              ))}
            </div>
          )}
        </section>

        {/* Панель пагінації */}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-button">
              Попередня
            </button>
            <span className="pagination-info">Сторінка {currentPage} з {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">
              Наступна
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;