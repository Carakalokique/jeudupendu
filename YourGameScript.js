var gameDiv = document.getElementById("game");

var words = [];
fetch("words.json")
  .then((response) => response.json())
  .then((data) => {
    words = data;

    var word = words[Math.floor(Math.random() * words.length)];
    var wordArray = word.split("");
    var hiddenWordArray = word.split("").map((letter) => "_");

    var incorrectLetters = [];

    var hangmanParts = [
      "head",
      "body",
      "left-arm",
      "right-arm",
      "left-leg",
      "right-leg",
    ];

    var hangmanDisplay = document.getElementById("hangman");

    var underscoreDisplay = document.getElementById("underscore");
    underscoreDisplay.textContent = hiddenWordArray.join(" ");

    var incorrectDisplay = document.getElementById("incorrectLetters");

    var modal = document.getElementById("modal");
    var modalMessage = document.getElementById("modalMessage");

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
          incorrectDisplay.textContent =
            "Lettres incorrectes: " + incorrectLetters.join(", ");
        }
      }

      underscoreDisplay.textContent = hiddenWordArray.join(" ");

      if (hiddenWordArray.join("") === word) {
        modalMessage.textContent =
          "Félicitations! Vous avez gagné! Vous avez bien deviné le mot : " +
          word +
          ".";
        modal.style.display = "block";
      }

      if (incorrectLetters.length === hangmanParts.length) {
        modalMessage.textContent =
          "Vous avez perdu! Le mot était : " + word + ".";
        modal.style.display = "block";
      }
    }

    window.addEventListener("keydown", function (event) {
      var key = event.key.toLowerCase();
      if (key.length === 1 && key.match(/[a-z]/i)) {
        guessLetter(key);
      }
    });

    const buttons = document.querySelectorAll(".keyboard-button");
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        guessLetter(this.value);
      });
    });

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      const azertyKeyboard = document.getElementById("azerty-keyboard");
      if (azertyKeyboard) azertyKeyboard.style.display = "flex";
    }

    var restartButton = document.getElementById("restartButton");
    // Set the z-index of the restartButton to a high value
    restartButton.style.zIndex = 9999;

    restartButton.addEventListener("click", function () {
      location.reload();
    });
    restartButton.addEventListener("touchend", function () {
      location.reload();
    });
  })
  .catch((error) => console.error("Error:", error));
