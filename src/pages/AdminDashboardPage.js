// src/pages/AdminDashboardPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { apartmentApi, rentalApi } from '../utils/api';
import { apartmentsSeedData } from '../utils/seedData';
import '../styles/admindashboard.css'; // Стилі для адмін панелі

function AdminDashboardPage() {
  const [apartments, setApartments] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Стан для форми додавання/редагування квартири
  const [isEditing, setIsEditing] = useState(false);
  const [currentApartment, setCurrentApartment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: '',
    rooms: '',
    area: '',
    pricePerDay: '',
    image: '',
  });

  // Завантаження всіх квартир
  const fetchApartments = useCallback(async () => {
    setError('');
    try {
      // Використовуємо порожні параметри, щоб отримати всі квартири без фільтрів
      const data = await apartmentApi.getApartments({});
      setApartments(data.apartments);
    } catch (err) {
      setError(err.message || 'Не вдалося завантажити квартири.');
      console.error('Error fetching apartments for admin:', err);
    }
  }, []);

  // Завантаження всіх оренд
  const fetchRentals = useCallback(async () => {
    setError('');
    try {
      const data = await rentalApi.getAllRentals();
      setRentals(data);
    } catch (err) {
      setError(err.message || 'Не вдалося завантажити оренди.');
      console.error('Error fetching rentals for admin:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Завантаження даних при першому рендері
  useEffect(() => {
    fetchApartments();
    fetchRentals();
  }, [fetchApartments, fetchRentals]);

  // Обробник зміни полів форми
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Обробник відправки форми додавання/редагування квартири
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Проста клієнтська валідація
    if (!formData.title || !formData.description || !formData.city || !formData.rooms || !formData.area || !formData.pricePerDay || !formData.image) {
      alert('Будь ласка, заповніть всі поля для квартири.');
      return;
    }
    if (isNaN(formData.rooms) || formData.rooms < 1 || isNaN(formData.area) || formData.area < 1 || isNaN(formData.pricePerDay) || formData.pricePerDay < 1) {
      alert('Кімнати, площа та ціна за день повинні бути додатними числами.');
      return;
    }


    try {
      if (isEditing && currentApartment) {
        // Редагування існуючої квартири
        await apartmentApi.updateApartment(currentApartment._id, formData);
        alert('Квартиру успішно оновлено!');
      } else {
        // Додавання нової квартири
        await apartmentApi.addApartment(formData);
        alert('Квартиру успішно додано!');
      }
      // Після успішного додавання/редагування, оновлюємо список квартир
      fetchApartments();
      // Очищаємо форму та скидаємо режим редагування
      setFormData({
        title: '',
        description: '',
        city: '',
        rooms: '',
        area: '',
        pricePerDay: '',
        image: '',
      });
      setIsEditing(false);
      setCurrentApartment(null);
    } catch (err) {
      setError(err.message || 'Помилка при збереженні квартири.');
      console.error('Error saving apartment:', err);
    }
  };

  // Вхід у режим редагування
  const handleEditClick = (apartment) => {
    setIsEditing(true);
    setCurrentApartment(apartment);
    setFormData({
      title: apartment.title,
      description: apartment.description,
      city: apartment.city,
      rooms: apartment.rooms,
      area: apartment.area,
      pricePerDay: apartment.pricePerDay,
      image: apartment.image,
    });
  };

  // Обробник видалення квартири
  const handleDeleteClick = async (apartmentId) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю квартиру?')) {
      return;
    }
    setError('');
    try {
      await apartmentApi.deleteApartment(apartmentId);
      alert('Квартиру успішно видалено!');
      fetchApartments(); // Оновлюємо список
    } catch (err) {
      setError(err.message || 'Помилка при видаленні квартири.');
      console.error('Error deleting apartment:', err);
    }
  };

  const handleSeedData = async () => {
    if (!window.confirm('Ви впевнені, що хочете додати тестові дані до бази? Це може створити багато нових квартир.')) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Проходимо по кожному об'єкту даних і відправляємо на бекенд
      for (const apartmentData of apartmentsSeedData) {
        await apartmentApi.addApartment(apartmentData);
      }
      alert('Базу даних успішно наповнено тестовими квартирами!');
      fetchApartments(); // Оновлюємо список квартир після додавання
    } catch (err) {
      setError(err.message || 'Помилка при наповненні бази тестовими даними.');
      console.error('Error seeding data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Обробник скасування редагування
  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentApartment(null);
    setFormData({
      title: '',
      description: '',
      city: '',
      rooms: '',
      area: '',
      price: '',
      image: '',
    });
  };


  if (loading) {
    return <p className="container">Завантаження адмін панелі...</p>;
  }

  if (error) {
    return <p className="container alert alert-danger">{error}</p>;
  }

  return (
    <div className="admin-dashboard-page container">
      <h2>Адмін Панель</h2>

      {/* Секція додавання/редагування квартир */}
      <section className="admin-section add-edit-apartment-section">
        <h3>{isEditing ? 'Редагувати квартиру' : 'Додати нову квартиру'}</h3>
        <form onSubmit={handleSubmit} className="apartment-form">
          <div className="form-group">
            <label htmlFor="title">Назва:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Опис:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="city">Місто:</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="rooms">Кількість кімнат:</label>
            <input type="number" id="rooms" name="rooms" value={formData.rooms} onChange={handleChange} required min="1" />
          </div>
          <div className="form-group">
            <label htmlFor="area">Площа (м²):</label>
            <input type="number" id="area" name="area" value={formData.area} onChange={handleChange} required min="1" />
          </div>
          <div className="form-group">
            <label htmlFor="pricePerDay">Ціна за день ($):</label>
            <input type="number" id="pricePerDay" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required min="1" />
          </div>
          <div className="form-group">
            <label htmlFor="image">URL зображення:</label>
            <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="action-button primary-button">
              {isEditing ? 'Оновити квартиру' : 'Додати квартиру'}
            </button>
            {isEditing && (
              <button type="button" onClick={handleCancelEdit} className="action-button secondary-button">
                Скасувати
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Секція керування квартирами */}
      <section className="admin-section apartments-management">
        <h3>Керування квартирами</h3>
        <button onClick={handleSeedData} className="action-button primary-button seed-button">
          Наповнити базу тестовими даними
        </button>
        {apartments.length === 0 ? (
          <p>Немає доданих квартир.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Фото</th>
                  <th>Назва</th>
                  <th>Місто</th>
                  <th>Ціна/день</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {apartments.map(apartment => (
                  <tr key={apartment._id}>
                    <td><img src={apartment.image} alt={apartment.title} className="thumbnail-image" /></td>
                    <td>{apartment.title}</td>
                    <td>{apartment.city}</td>
                    <td>${apartment.pricePerDay}</td>
                    <td>
                      <button onClick={() => handleEditClick(apartment)} className="action-button edit-button">Редагувати</button>
                      <button onClick={() => handleDeleteClick(apartment._id)} className="action-button delete-button">Видалити</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Секція всіх оренд */}
      <section className="admin-section all-rentals">
        <h3>Всі оренди</h3>
        {rentals.length === 0 ? (
          <p>Немає оформлених оренд.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Квартира</th>
                  <th>Орендар</th>
                  <th>Номер тел.</th>
                  <th>Дата початку</th>
                  <th>Днів</th>
                  <th>Вартість</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map(rental => (
                  <tr key={rental._id}>
                    <td>
                      <img src={rental.apartment?.image} alt={rental.apartment?.title} className="thumbnail-image" />
                      {rental.apartment?.title} ({rental.apartment?.city})
                    </td>
                    <td>{rental.user?.name}</td>
                    <td>{rental.user?.phoneNumber}</td>
                    <td>{new Date(rental.startDate).toLocaleDateString('uk-UA')}</td>
                    <td>{rental.rentalDays}</td>
                    <td>${rental.totalPrice?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboardPage;