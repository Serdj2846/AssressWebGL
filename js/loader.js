playBttn0 = document.querySelector('.playBttn0');
playBttn1 = document.querySelector('.playBttn1');

allImages = []; 
allImagesContur = []; 
smiles = [];
smileProgress = [];

audio1 = []; 
audio2 = [];
teach = [];

bigBttn = [];
progress = [];

allPairs = []; 
randomPair = [];
var usedPairs = []; 

var training = true;
var question = 0;
var mistake = 0;
var buttonIndex;
var questionIndex;
var win = false;
var lesson = 1;
var item;

function loadImage(images, path, n) {
  for (let i = 1; i <= n; i++) {
    const imagePath = `${path}${i}.png`;
    images.push(imagePath);
  }
  return allImages;
}

function loadSmiles(images, path, n) {
  for (let i = 1; i <= n; i++) {
    const imagePath = `${path}${i}.png`;
    images.push(imagePath);
  }
  return allImages;
}

function loadImageContur(images, path, n) {
  for (let i = 1; i <= n; i++) {
    const imagePath = `${path}${i}.png`;
    images.push(imagePath);
  }
  return allImages;
}

function loadAudio(audio, path, n) {
  for (let i = 1; i <= n; i++) {
    const audioPath = `${path}${i}.mp3`;
    audio.push(audioPath);
  }
  return audio;
}

function loadBack(n) {
  var imagePath = 'back/' + n + '.jpg';
  var screenContainer = document.querySelector('.screen-container');

  if (screenContainer) {
    screenContainer.style.backgroundImage = 'url("' + imagePath + '")';
  }
}

function createSmile() {
  var smileContainer = document.querySelector('.smile-container');
  var img = document.createElement('img');

  img.style.height = '50%';
  img.style.objectFit = 'cover';
  img.src = smiles[0];
  smileContainer.appendChild(img);
  smileProgress.push(img);
}

function loadSmileProgress() {
  var smileContainer = document.querySelector('.smile-container');
  for (let i = 0; i < progress.length; i++) {
    smileProgress[i].src = smiles[progress[i]];
  }
}

function loadBigBttn(n) {
  var screenContainer = document.querySelector('.screen-container');
  screenContainer.innerHTML = '';
  for (let i = 1; i <= n; i++) {
    var button = document.createElement('button');
    button.className = 'bigBttn';
    screenContainer.appendChild(button);
    bigBttn.push(button);
  }
}

function choosePair() {
  var eligiblePairs = allPairs.filter(pair =>
    pair.every(index => index >= 0 && index < progress.length) &&
    pair.some(index => progress[index] !== 3) &&
    !usedPairs.some(usedPair => usedPair.every((val, index) => val === pair[index]))
  );

  if (eligiblePairs.length > 0) {
    var randomIndex = Math.floor(Math.random() * eligiblePairs.length);
    randomPair = eligiblePairs[randomIndex];

    for (var i = 0; i < randomPair.length; i++) {
      if (randomPair[i] >= 0 && randomPair[i] < allImages.length) {
        bigBttn[i].style.backgroundImage = 'url("' + allImages[randomPair[i]] + '")';
      }
    }
    console.log('Случайная пара: [' + randomPair.join(', ') + ']');
    console.log('Прогресс: [' + progress.join(', ') + ']');
    usedPairs.push(randomPair);

    if (eligiblePairs.length === 1) {
      usedPairs = [];
    }
  }
}

function chooseQuestion()
{
  for (i = question; i < bigBttn.length; i++) {
    if (progress[randomPair[i]] < 3) {
      question = i;
      console.log(progress[randomPair[i]]);
      console.log(question);
      return;
    }
  }
}

function playAudio(audioPath) {
  return new Promise((resolve) => {
    const audioPlayer = new Audio(audioPath);
    audioPlayer.addEventListener('ended', resolve);
    audioPlayer.play();
  });
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function bigBttnOff(status) {
  for (let i = 0; i < bigBttn.length; i++) {
    bigBttn[i].disabled = status;
  }
}

function playBttnOff(status0, status1) {
  playBttn0.disabled = status0;
  playBttn1.disabled = status1;
}

function checkProgress() {
  for (let i = 0; i < progress.length; i++) {
    const numericValue = parseInt(progress[i], 10);
    console.log(`Value at index ${i}: ${numericValue}`);
    if (numericValue !== 3) {
      return false;
    }
  }
  return true;
}

async function listen() {
  for (let i = 0; i < randomPair.length; i++) {
    await wait(3000);
    bigBttn[i].style.backgroundImage = 'url("' + allImagesContur[randomPair[i]] + '")';
    await playAudio(audio1[randomPair[i]]);
    bigBttn[i].style.boxShadow = null;
    bigBttn[i].style.backgroundImage = 'url("' + allImages[randomPair[i]] + '")';

    await wait(500);
    bigBttn[i].style.backgroundImage = 'url("' + allImagesContur[randomPair[i]] + '")';
    await playAudio(audio2[randomPair[i]]);
    bigBttn[i].style.boxShadow = null;
    bigBttn[i].style.backgroundImage = 'url("' + allImages[randomPair[i]] + '")';
    
    if (progress[randomPair[i]] == 0) {
      progress[randomPair[i]] = 1;
      smileProgress[randomPair[i]].src = smiles[1];
    }
  }

  if (training) {
    playBttn1.textContent = 'Играю';
    playBttn1.disabled = false;
    training = false;
  } else {
    play();
  }
}

function paintSmile() {
  if (progress[randomPair[question]] == 2) {
    progress[randomPair[question]] = 3;
    smileProgress[randomPair[question]].src = smiles[3];
  }
  if (progress[randomPair[question]] == 1) {
    progress[randomPair[question]] = 2;
    smileProgress[randomPair[question]].src = smiles[2];
  }
}

async function play() {
  await wait(500);
  await playAudio(teach[0]);

  await wait(2000);
  await playAudio(audio1[randomPair[question]]);
  
  bigBttnOff(false);
  playBttn0.disabled = false;
}

async function Yes() {
  bigBttnOff(true);
  await wait(500);
  await playAudio(teach[1]);

  await wait(2000);
  await playAudio(teach[2]);

  console.log(progress);
  if (checkProgress()) {
    win = true;
    playBttn0.textContent = "Остаться в этом упражнении";
    playBttn1.textContent = "Перейти к следующему упражнению";
    playBttnOff(false);
    return;
  }

  await wait(2000);
  await playAudio(teach[3]);

  if (question == 0) {
    choosePair();
    chooseQuestion();
    listen();
  } else {
    play(); 
  }
}

async function No() {
  await wait(500);
  await playAudio(teach[4]);

  if (mistake < 2) {
    await wait(2000);
    await playAudio(teach[5]);
    await wait(2000);
    play();
  }
  else {
    await wait(2000);
    await playAudio(teach[3]);
    await wait(2000);
    mistake = 0;
    choosePair();
    checkProgress();
    listen();
  }
}

function resetGame() {
  progress = Array(6).fill(0);
  loadSmileProgress();
  playBttn0.textContent = 'Прослушать заново';
  playBttn1.textContent = "Слушаю";
  training = true;
  win = false;
  question = 0;
  playBttnOff(true, false);
  choosePair();
}

function title(n, name) {
  document.getElementById('p1').innerHTML = n;
  document.getElementById('p2').innerHTML = name;
}
