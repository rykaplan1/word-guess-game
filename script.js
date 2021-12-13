const words = ["JAVASCRIPT", "PROGRAMMING", "GITHUB"];

let word;
let remainingLetters;
const letterBlanks = document.getElementById('letter-blanks');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const timerBox = document.getElementById('timer-box');
const timer = document.getElementById('timer');
const resultText = document.getElementById('result-text');
const wins = document.getElementById('wins');
const losses = document.getElementById('losses');
let seconds;
let timeInterval;
let winCounter = 0;
let lossCounter = 0;

let gameStart = false;
let guessedLetters = 0;
letterBlanks.style.display = 'none';
timerBox.style.display = 'none';

const setTime = () => {
  seconds = 60;
  timer.textContent = seconds;
  timeInterval = setInterval(function() {
    seconds--;
    timer.textContent = seconds;
    if (seconds === 0) {
      clearInterval(timeInterval);
      resultText.innerText = "You lose!";
      lossCounter++;
      setLosses();
      startButton.disabled = false;
    }
  }, 1000);
}

const setWins = () => {
  wins.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
};

const setLosses = () => {
  losses.textContent = lossCounter;
  localStorage.setItem("lossCount", lossCounter);
};

const getWins = () => {
  const storedWins = localStorage.getItem("winCount");
  if (storedWins) {
    winCounter = storedWins;
  } else {
    winCounter = 0;
  }
  wins.textContent = winCounter;
};

const getLosses = () => {
  const storedLosses = localStorage.getItem("lossCount");
  if (storedLosses) {
    lossCounter = storedLosses;
  } else {
    lossCounter = 0;
  }
  losses.textContent = lossCounter;
};


startButton.addEventListener("click", function() {
  letterBlanks.innerHTML = "";
  word = words[Math.floor(Math.random() * words.length)];
  remainingLetters = word.length;
  setTime();
  for (let i = 0; i < word.length; i++) {
    letterBlanks.innerHTML += '<div class="letter-blank">_</div>';
  }
  letterBlanks.style.display = 'flex';
  timerBox.style.display = 'block';
  startButton.disabled = true;
});

resetButton.addEventListener("click", function() {
  const resetInput = confirm("Are you sure you want to reset your score?");
  if (resetInput) {
    winCounter = 0;
    lossCounter = 0;
    setWins();
    setLosses();
  }
})

document.addEventListener("keyup", function(event) {
  const letterGuess = event.key.toUpperCase();
  for (let i = 0; i < word.length; i++) {
    if (seconds > 0 && letterGuess === word[i]) {
      letterBlanks.children[i].innerText = letterGuess;
      remainingLetters--;
      if (seconds > 0 && remainingLetters === 0) {
        clearInterval(timeInterval);
        resultText.innerText = "You win!";
        winCounter++;
        setWins();
        startButton.disabled = false;
      }
    }
  }
});

getWins();
getLosses();
