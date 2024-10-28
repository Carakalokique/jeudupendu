document.addEventListener("DOMContentLoaded", function () {
  var restartButton = document.getElementById("restartButton");
  restartButton.style.zIndex = 9999;

  restartButton.addEventListener("click", function () {
    location.reload();
  });

  // Add event listener to stop propagation for email input
  var emailInput = document.getElementById("email");
  emailInput.addEventListener("keydown", function (event) {
    event.stopPropagation();
  });

  var gameDiv = document.getElementById("game");

  var words = [];
  fetch("wordsdifficiles.json")
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

      var modalButton = document.getElementById("modalButton");
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
            "Vous avez perdu ! Le mot était : " + word + ".";
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

      modalButton.addEventListener("click", function () {
        window.location.href = "https://jeuxvirtuels.com/?ref=jeudupendu.com";
      });
      modalButton.addEventListener("touchend", function () {
        window.location.href = "https://jeuxvirtuels.com/?ref=jeudupendu.com";
      });

      modalButton.style.zIndex = 9998;

      restartButton.addEventListener("touchend", function () {
        location.reload();
      });
    })
    .catch((error) => console.error("Error:", error));

  // Function to check query parameters
  function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queryArray = queryString.split("&");
    for (const query of queryArray) {
      const [key, value] = query.split("=");
      params[key] = value;
    }
    return params;
  }

  // Function to remove query parameters
  function removeQueryParams() {
    const url = new URL(window.location);
    url.searchParams.delete("subscribed");
    url.searchParams.delete("tally");
    window.history.replaceState({}, document.title, url.pathname);
  }

  // Check for the 'subscribed' and 'tally' query parameters
  const queryParams = getQueryParams();
  if (queryParams.subscribed === "true") {
    var subscriptionModal = document.getElementById("subscriptionModal");
    subscriptionModal.style.display = "block";
    removeQueryParams(); // Remove the query parameter
  } else if (queryParams.tally === "true") {
    var tallyModal = document.getElementById("tallyModal");
    tallyModal.style.display = "block";
    removeQueryParams(); // Remove the query parameter
  }

  var subscriptionModalButton = document.getElementById(
    "subscriptionModalButton"
  );
  subscriptionModalButton.addEventListener("click", function () {
    location.reload();
  });

  var tallyModalButton = document.getElementById("tallyModalButton");
  tallyModalButton.addEventListener("click", function () {
    location.reload();
  });
});
