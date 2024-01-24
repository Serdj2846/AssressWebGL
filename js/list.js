async function loadImageData(folderPath) {
  try {
    const response = await fetch(folderPath);
    const data = await response.text(); // Здесь изменено на .text()
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
}

// Использование
const folderPath = 'js';

loadImageData(folderPath)
  .then(data => {
    // Обработка данных
    console.log(data);
  })
  .catch(error => {
    // Обработка ошибки
    console.error('Ошибка:', error);
  });
