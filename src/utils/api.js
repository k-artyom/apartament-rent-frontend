// src/utils/api.js

const API_BASE_URL = 'http://localhost:5000/api'; // Базовий URL для нашого бекенду

// Універсальна функція для виконання запитів до API
const apiRequest = async (url, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Додаємо тіло запиту для POST та PUT
  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, options);
    const responseData = await response.json(); // Парсимо відповідь як JSON

    // Обробка помилок HTTP
    if (!response.ok) {
      // Якщо відповідь не успішна (наприклад, 400, 401, 500), кидаємо помилку з повідомленням сервера
      throw new Error(responseData.message || 'Щось пішло не так');
    }

    return responseData; // Повертаємо дані у разі успіху
  } catch (error) {
    console.error('Помилка API запиту:', error.message);
    throw error; // Перекидаємо помилку для обробки у компонентах
  }
};

// Функції для роботи з аутентифікацією
export const authApi = {
  register: (userData) => apiRequest('/auth/register', 'POST', userData),
  login: (userData) => apiRequest('/auth/login', 'POST', userData),
};

// Функції для роботи з квартирами
export const apartmentApi = {
  getApartments: (params) => {
    // Формуємо URL з параметрами запиту
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/apartments?${queryString}`);
  },
  getApartmentById: (id) => apiRequest(`/apartments/${id}`),
  addApartment: (apartmentData) => apiRequest('/apartments', 'POST', apartmentData),
  updateApartment: (id, apartmentData) => apiRequest(`/apartments/${id}`, 'PUT', apartmentData),
  deleteApartment: (id) => apiRequest(`/apartments/${id}`, 'DELETE'),
};

// Функції для роботи з користувачами
export const userApi = {
  getUserProfile: (userId) => apiRequest(`/users/${userId}`),
  addFavorite: (userId, apartmentId) => apiRequest('/users/favorites', 'POST', { userId, apartmentId }),
  removeFavorite: (userId, apartmentId) => apiRequest('/users/favorites', 'DELETE', { userId, apartmentId }),
  getUserRentals: (userId) => apiRequest(`/users/${userId}/rentals`),
};

// Функції для роботи з орендами
export const rentalApi = {
  createRental: (rentalData) => apiRequest('/rentals', 'POST', rentalData),
  getAllRentals: () => apiRequest('/rentals/all'), // Для адмін панелі
};