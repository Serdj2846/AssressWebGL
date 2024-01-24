var screen = document.querySelector('.screen-container');
while (screen.firstChild) {
    screen.removeChild(screen.firstChild);
}
var image1 = document.createElement('button');
image1.classList.add('imageContainer');
var image2 = document.createElement('button');
image2.classList.add('imageContainer');


screen.appendChild(image1);
screen.appendChild(image2);

// Сохранение
var currentNumber = localStorage.getItem('myNumberKey');
var newNumber = currentNumber ? parseInt(currentNumber, 10) + 1 : 1;
localStorage.setItem('myNumberKey', newNumber);
console.log(newNumber);
