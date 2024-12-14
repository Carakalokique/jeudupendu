document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const playerInputModal = document.getElementById("playerInputModal");
  const gameOverModal = document.getElementById("gameOverModal");
  const wordInput = document.getElementById("wordInput");
  const nextWordInput = document.getElementById("nextWordInput");
  const confirmWordButton = document.getElementById("confirmWordButton");
  const nextWordButton = document.getElementById("nextWordButton");
  const gameOverMessage = document.getElementById("gameOverMessage");
  
  let word = "";
  let wordArray = [];
  let hiddenWordArray = [];
  let incorrectLetters = [];
  
  const hangmanParts = [
    "head",
    "body",
    "left-arm",
    "right-arm",
    "left-leg",
    "right-leg",
  ];

  // Show initial modal on page load
  playerInputModal.style.display = "block";

  // Function to validate input word (only letters, no spaces, accents, or hyphens)
  function isValidWord(input) {
    return /^[a-z]+$/i.test(input);
  }

  // Function to start new game with given word
  function startGame(newWord) {
    word = newWord.toLowerCase();
    wordArray = word.split("");
    hiddenWordArray = word.split("").map(() => "_");
    incorrectLetters = [];
    
    // Reset display
    document.getElementById("underscore").textContent = hiddenWordArray.join(" ");
    document.getElementById("incorrectLetters").textContent = "";
    
    // Reset hangman
    hangmanParts.forEach(part => {
      document.getElementById(part).style.display = "none";
    });
  }

  // Handle word input submission
  confirmWordButton.addEventListener("click", function() {
    const inputWord = wordInput.value.trim().toLowerCase();
    if (isValidWord(inputWord)) {
      wordInput.value = "";
      playerInputModal.style.display = "none";
      startGame(inputWord);
    } else {
      alert("Le mot ne doit contenir que des lettres, sans accents, espaces ou traits d'union");
    }
  });

  // Handle next word submission after game over
  nextWordButton.addEventListener("click", function() {
    const inputWord = nextWordInput.value.trim().toLowerCase();
    if (isValidWord(inputWord)) {
      nextWordInput.value = "";
      gameOverModal.style.display = "none";
      startGame(inputWord);
    } else {
      alert("Le mot ne doit contenir que des lettres, sans accents, espaces ou traits d'union");
    }
  });

  function guessLetter(guessedLetter) {
    if (wordArray.includes(guessedLetter)) {
      wordArray.forEach(function (letter, index) {
        if (letter === guessedLetter) {
          hiddenWordArray[index] = guessedLetter;
        }
      });
    } else {
      if (!incorrectLetters.includes(guessedLetter)) {
        incorrectLetters.push(guessedLetter);
        if (incorrectLetters.length <= hangmanParts.length) {
          document.getElementById(
            hangmanParts[incorrectLetters.length - 1]
          ).style.display = "inline";
        }
        document.getElementById("incorrectLetters").textContent =
          "Lettres incorrectes: " + incorrectLetters.join(", ");
      }
    }

    document.getElementById("underscore").textContent = hiddenWordArray.join(" ");

    // Check win/lose conditions
    if (hiddenWordArray.join("") === word) {
      gameOverMessage.textContent = "Félicitations! Vous avez gagné! Le mot était : " + word;
      gameOverModal.style.display = "block";
    }

    if (incorrectLetters.length === hangmanParts.length) {
      gameOverMessage.textContent = "Vous avez perdu ! Le mot était : " + word;
      gameOverModal.style.display = "block";
    }
  }

  // Event listeners for keyboard input
  window.addEventListener("keydown", function (event) {
    if (playerInputModal.style.display === "block" || gameOverModal.style.display === "block") {
      return;
    }
    var key = event.key.toLowerCase();
    if (key.length === 1 && key.match(/[a-z]/i)) {
      guessLetter(key);
    }
  });

  // Event listeners for on-screen keyboard
  const buttons = document.querySelectorAll(".keyboard-button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (playerInputModal.style.display === "block" || gameOverModal.style.display === "block") {
        return;
      }
      guessLetter(this.value);
    });
  });
});
