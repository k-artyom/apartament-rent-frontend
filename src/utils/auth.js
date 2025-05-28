// src/utils/auth.js

const USER_STORAGE_KEY = 'currentUser'; // Ключ для зберігання користувача в localStorage

// Функція для збереження даних користувача після входу/реєстрації
export const saveUser = (user) => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Помилка збереження користувача в localStorage:', error);
  }
};

// Функція для отримання поточного користувача
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(USER_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Помилка отримання користувача з localStorage:', error);
    return null;
  }
};

// Функція для виходу користувача (видалення даних з localStorage)
export const logout = () => {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Помилка видалення користувача з localStorage:', error);
  }
};

// Функція для перевірки, чи користувач авторизований
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};