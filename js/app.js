
const overlay = document.getElementById('overlay');
const startGame = document.querySelector('#overlay a');
const heading = document.querySelector('#overlay h2');
const key = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const guessPhrase = document.querySelector('#phrase ul');
const guessChar = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const btn = document.getElementsByTagName('button');
const tries = document.querySelectorAll('.tries img');
const choosen = document.getElementsByClassName('chosen');
let missed = 0;
const phrases = [
  'I tried to embrace my inner child today and the little brat bit me',
  'To drink responsibly is not spill it',
  'Life is a soup and I am a fork',
  'The short answer is no and the long answer is oh hell no',
  'If I send you my ugly selfies our friendship is real',
  'Welcome to the dark side where all the fun stuff happens'
];
let phraseArray = getRandomPhraseAsArray(phrases);
let letterFound;
addPhraseToDisplay(phraseArray)

function resetPhrase() {
  while (guessChar.length > 0) {
    guessPhrase.removeChild(guessPhrase.firstChild);
  };
}

function resetLives() {
  missed = 0;
  let i = 0;
  while (i < 5) {
    tries[i].src = 'images/liveHeart.png';
    i++;
  };
}

function resetBtn() {
  for (i = 0; i < btn.length; i++){
    checkClass = btn[i].className;
    if (checkClass == 'chosen') {
      btn[i].className = '';
    };
    if (btn[i].disabled === true) {
      btn[i].removeAttribute('disabled');
    }
  };
}

startGame.addEventListener('click', () => {
  overlay.style.display = 'none';
  buttontext = startGame.textContent;
  if (buttontext === 'Play Again' || buttontext === 'Try Again') {
    letterFound = '';
    resetPhrase()
    resetLives()
    resetBtn()
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
  }
});

function getRandomPhraseAsArray(arr){
  let i = Math.floor(Math.random() * (arr.length + 1));
  let currphrase = arr[i].split('');
  return currphrase;
}



function addPhraseToDisplay(arr){
  for (let i = 0; i < arr.length; i++){
    let li = document.createElement('LI');
    let listItem = arr[i];
    li.textContent = listItem;
    if (li.textContent != ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
    guessPhrase.append(li);
  }
}

function checkletter(btntext) {
  letterFound = '';
  for (let i = 0; i < guessChar.length; i++) {
    let char = guessChar[i].textContent;
    let letter = btntext.toLowerCase();
    if (letter === char.toLowerCase()) {
      guessChar[i].className += ' show';
      letterFound = letter;
    }
  }
  if (letterFound) {
    return letterFound;
  } else {
    return letterFound = null;
  }
}

qwerty.addEventListener('click', (event)=>{
  if (event.target.tagName == 'BUTTON') {
  event.target.className = 'chosen';
  event.target.setAttribute('disabled', true);
  btntext = event.target.textContent;
  checkletter(btntext);
  if (letterFound === null) {
    tries[missed].src = 'images/lostHeart.png';
    missed++;
  }
  checkWin();
};
});

function checkWin(){
  if (guessChar.length === show.length) {
    overlay.style.display = 'flex';
    overlay.className = '';
    overlay.className = 'win';
    heading.textContent = 'CONGRATULTIONS, YOU WON!!!';
    startGame.textContent = 'Play Again';
  };
  if (missed >= 5) {
    overlay.style.display = 'flex';
    overlay.className = '';
    overlay.className = 'lose';
    heading.textContent = 'Persistence is key to SUCCESS';
    startGame.textContent = 'Try Again';
  };
}
