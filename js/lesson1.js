item = 6;
progress = Array(item).fill(0);

title('Упражнение 1', 'Музыкальные инструменты');
playBttn0.textContent = "Прослушать заново";
playBttn1.textContent = "Слушаю";

loadAudio(audio1, 'L1/audio1/', item);
loadAudio(audio2, 'L1/audio2/', item);
loadAudio(teach, 'L1/teach/', 6);
loadImage(allImages, 'L1/img/', item);
loadImageContur(allImagesContur, 'L1/contur/', item);
loadSmiles(smiles, 'smiles/', 4);
loadBigBttn(2);
loadBack('1');
bigBttnOff(true);
playBttnOff(true, false);

allPairs[0] = [0, 1];
allPairs[1] = [0, 2];
allPairs[2] = [1, 3];
allPairs[3] = [5, 3];
allPairs[4] = [2, 4];
allPairs[5] = [5, 4];

choosePair();
chooseQuestion();

for (let i = 0; i < bigBttn.length; i++) {
  bigBttn[i].addEventListener('click', handleClick);
  }
  
  function handleClick(event) {
  buttonIndex = bigBttn.indexOf(event.currentTarget);
  console.log('Кнопка с индексом ' + buttonIndex + ' нажата');
  
  if (buttonIndex === question) {
    mistake = 0;
    paintSmile();
    question++;
    if (question == bigBttn.length) {
      question = 0;
    } 
    console.log('вопрос № ' + question);
    Yes();
  } else {
    mistake++;
    No();
  }
  }
  
  playBttn0.addEventListener('click', function() {
  playBttn0.disabled = true;
  if (win == true) {
    resetGame();
  } else {
    play();   
  }
  });
  
  playBttn1.addEventListener('click', function() {
  playBttn1.disabled = true;
  if (win == true) {
    if (currentScript) {
      document.head.removeChild(currentScript);
    }
    currentScript = loadScript(lesson2, function () {
    });
    win = false;
    return;
  }
  
  if (training) {
    listen();
  } else {
    play();
  }
  });
  
  var smileContainer = document.querySelector('.smile-container');
  smileContainer.innerHTML = '';
  for (let i = 1; i <= item; i++) {
  
  createSmile();
  }
  
  loadSmileProgress();
