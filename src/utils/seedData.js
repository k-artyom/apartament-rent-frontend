// src/utils/seedData.js

// Список наданих URL зображень (залишаємо без змін)
const images = [
  "https://plus.unsplash.com/premium_photo-1674676471417-07f613528a94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1675279200694-8529c73b1fd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhrtmentJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1689043528099-2ba014dd7c64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1606074280798-2dabb75ce10c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1665249934445-1de680641f50?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1667510436110-79d3dabc2008?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1674676471154-1acce154992d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1617201929478-8eedff7508f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1674676471622-feaf2130fc73?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1650137938625-11576502aecd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVnfDB8fDB8fHww",
  "https://images.unsplash.com/photo-1663756915304-40b7eda63e41?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1599243272864-e9dd455966bd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1653972233229-1b8c042d6d8e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1628592102751-ba83b0314276?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1680100256112-2e1231d9d0df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww"
];

export const cities = ["Тернопіль", "Київ", "Львів", "Одеса", "Харків", "Дніпро", "Запоріжжя", "Вінниця", "Полтава", "Чернігів"];

// Новий масив для різноманітних заголовків
const apartmentTitles = [
  "Затишна квартира",
  "Простора оселя",
  "Сучасні апартаменти",
  "Світла студія",
  "Комфортне житло",
  "Елітна квартира",
  "Бюджетний варіант",
  "Квартира з видом",
  "Атмосферна квартира",
  "Тиха квартира в центрі",
  "Нова квартира у ЖК",
  "Скандинавський стиль",
  "Лофт-апартаменти",
  "Квартира біля парку",
  "Зручне розташування",
  "Відмінний вибір",
  "Квартира для сім'ї",
  "Стильне помешкання",
  "Квартира-студія",
  "Затишний куточок",
  "Апартаменти преміум-класу",
  "Квартира з терасою"
];


// Новий масив для зручностей
const amenities = [
  "Wi-Fi", "Кондиціонер", "Телевізор", "Пральна машина", "Сушарка",
  "Посудомийна машина", "Мікрохвильова піч", "Холодильник", "Плита",
  "Духова шафа", "Чайник", "Постільна білизна", "Рушники",
  "Фен", "Праска", "Пилосос", "Кавоварка", "Балкон", "Безкоштовна парковка"
];

// Новий масив для загальних фраз до опису
const generalDescriptions = [
  "Ця квартира ідеально підходить для тих, хто шукає комфорт та затишок.",
  "Розташована у зручному районі з розвиненою інфраструктурою.",
  "Забезпечує всі умови для приємного відпочинку або продуктивної роботи.",
  "Чудовий вибір для короткострокової або довгострокової оренди.",
  "Світла та простора квартира, що дарує відчуття дому.",
  "Зручний доступ до громадського транспорту та основних визначних місць."
];

// Функція для генерації випадкових даних про квартиру
const generateRandomApartment = (index) => {
  const rooms = Math.floor(Math.random() * 3) + 1; // 1, 2 або 3 кімнати
  const area = Math.floor(Math.random() * (100 - 30 + 1)) + 30; // Площа від 30 до 100 кв.м
  const pricePerDay = Math.floor(Math.random() * (150 - 30 + 1)) + 30; // Ціна від 30 до 150 доларів

  const city = cities[Math.floor(Math.random() * cities.length)];
  const title = `${apartmentTitles[Math.floor(Math.random() * apartmentTitles.length)]} у ${city}`; // Випадковий заголовок + місто
  const image = images[index % images.length]; // Використовуємо images по черзі, зациклюючи їх

  // Генеруємо випадковий опис зі зручностями та умовами
  const selectedAmenities = Array.from({ length: Math.floor(Math.random() * 5) + 3 }, () =>
    amenities[Math.floor(Math.random() * amenities.length)]
  ).filter((value, idx, self) => self.indexOf(value) === idx); // Унікальні зручності

  const conditions = [
    "Без тварин.",
    "Не палити в квартирі.",
    "Тихі години після 22:00.",
    "Мінімальний термін оренди - 2 дні.",
    "Застава 50% від вартості оренди."
  ];
  const selectedConditions = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
    conditions[Math.floor(Math.random() * conditions.length)]
  ).filter((value, idx, self) => self.indexOf(value) === idx); // Унікальні умови

  const description = `${generalDescriptions[Math.floor(Math.random() * generalDescriptions.length)]}
  \n**Зручності:** ${selectedAmenities.join(', ')}.
  \n**Умови оренди:** ${selectedConditions.join(' ')}`;

  return {
    title,
    description,
    city,
    rooms,
    area,
    pricePerDay,
    image,
  };
};

// Створимо 20 тестових квартир (або більше, якщо потрібно)
export const apartmentsSeedData = Array.from({ length: 20 }, (_, i) => generateRandomApartment(i));

// Додамо декілька квартир з конкретними містами, щоб було простіше тестувати фільтр
// Ці квартири також будуть використовувати нові шаблони описів/заголовків
apartmentsSeedData.push({
  title: "Апартаменти біля вокзалу",
  description: "Зручне розташування біля залізничного вокзалу, ідеально для мандрівників.\n\n**Зручності:** Wi-Fi, Телевізор, Постільна білизна, Рушники.\n\n**Умови оренди:** Без тварин. Не палити в квартирі.",
  city: "Тернопіль",
  rooms: 1,
  area: 35,
  pricePerDay: 45,
  image: images[0],
});

apartmentsSeedData.push({
  title: "Квартира з видом на Дніпро",
  description: "Видова квартира з панорамним видом на річку Дніпро, комфортно і сучасно.\n\n**Зручності:** Wi-Fi, Кондиціонер, Пральна машина, Посудомийна машина, Балкон.\n\n**Умови оренди:** Застава 50% від вартості оренди. Тихі години після 22:00.",
  city: "Київ",
  rooms: 2,
  area: 60,
  pricePerDay: 80,
  image: images[1],
});

apartmentsSeedData.push({
  title: "Сучасна квартира в центрі Львова",
  description: "Світла і простора квартира в самому серці Львова, поруч з Площею Ринок.\n\n**Зручності:** Wi-Fi, Кондиціонер, Телевізор, Посудомийна машина, Праска, Кавоварка.\n\n**Умови оренди:** Мінімальний термін оренди - 2 дні. Не палити в квартирі.",
  city: "Львів",
  rooms: 3,
  area: 85,
  pricePerDay: 120,
  image: images[2],
});

apartmentsSeedData.push({
  title: "Квартира у новобудові",
  description: "Нова квартира в сучасному житловому комплексі, з усіма зручностями.\n\n**Зручності:** Wi-Fi, Холодильник, Плита, Духова шафа, Мікрохвильова піч, Безкоштовна парковка.\n\n**Умови оренди:** Без тварин. Тихі години після 22:00.",
  city: "Одеса",
  rooms: 2,
  area: 70,
  pricePerDay: 90,
  image: images[3],
});

apartmentsSeedData.push({
  title: "Затишна студія біля парку",
  description: "Компактна студія, ідеальна для однієї особи або пари, поруч великий парк.\n\n**Зручності:** Wi-Fi, Чайник, Фен, Постільна білизна, Рушники.\n\n**Умови оренди:** Не палити в квартирі. Мінімальний термін оренди - 2 дні.",
  city: "Тернопіль",
  rooms: 1,
  area: 30,
  pricePerDay: 40,
  image: images[4],
});