async function loadImageData(folderPath) {
  try {
    const response = await fetch(folderPath);
    const data = await response.text(); // ����� �������� �� .text()
    return data;
  } catch (error) {
    console.error('������ ��� �������� ������:', error);
    throw error;
  }
}

// �������������
const folderPath = 'js';

loadImageData(folderPath)
  .then(data => {
    // ��������� ������
    console.log(data);
  })
  .catch(error => {
    // ��������� ������
    console.error('������:', error);
  });
