// Selecting the game div
var gameDiv = document.getElementById("game");

// Fetch the list of words from a JSON file
var words = [];
fetch("words.json")
  .then((response) => response.json())
  .then((data) => {
    words = data;

    var word = words[Math.floor(Math.random() * words.length)]; // Choose a random word
    var wordArray = word.split("");
    var hiddenWordArray = word.split("").map((letter) => "_");

    // Incorrectly guessed letters
    var incorrectLetters = [];

    // Hangman steps
    var hangmanParts = [
      "head",
      "body",
      "left-arm",
      "right-arm",
      "left-leg",
      "right-leg",
    ];

    // Creating elements
    var hangmanDisplay = document.getElementById("hangman");

    var underscoreDisplay = document.getElementById("underscore");
    underscoreDisplay.textContent = hiddenWordArray.join(" ");

    var incorrectDisplay = document.getElementById("incorrectLetters");

    var modal = document.getElementById("modal");
    var modalMessage = document.getElementById("modalMessage");

    // Function to guess a letter
    function guessLetter(guessedLetter) {
      // Check if the letter is in the word
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
          incorrectDisplay.textContent =
            "Lettres incorrectes: " + incorrectLetters.join(", ");
        }
      }

      underscoreDisplay.textContent = hiddenWordArray.join(" ");

      // Check if the word is completely guessed
      if (hiddenWordArray.join("") === word) {
        modalMessage.textContent =
          "Félicitations! Vous avez gagné! Vous avez bien deviné le mot : " +
          word +
          ".";
        modal.style.display = "block";
      }

      // Check if the game is lost
      if (incorrectLetters.length === hangmanParts.length) {
        modalMessage.textContent =
          "Vous avez perdu! Le mot était : " + word + ".";
        modal.style.display = "block";
      }
    }

    // Adding event listener for keyboard input
    window.addEventListener("keydown", function (event) {
      var key = event.key.toLowerCase();
      // Check if it's a letter
      if (key.length === 1 && key.match(/[a-z]/i)) {
        guessLetter(key);
      }
    });

    // Event listener for keyboard buttons
    const buttons = document.querySelectorAll(".keyboard-button");
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        guessLetter(this.value);
      });
    });

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      document.getElementById("azerty-keyboard").style.display = "flex";
    }

    var restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", function () {
      location.reload();
    });
    restartButton.addEventListener("touchend", function () {
      location.reload();
    });
  })
  .catch((error) => console.error("Error:", error));
