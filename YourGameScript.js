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
  
  // Cache pour les mots
  var wordsCache = null;
  
  // Fonction pour charger les mots de manière asynchrone
  async function loadWords() {
    if (wordsCache) {
      return wordsCache;
    }
    
    try {
      // Vérifier le cache du navigateur
      const cachedWords = localStorage.getItem('gameWords');
      const cacheTimestamp = localStorage.getItem('gameWordsTimestamp');
      const cacheExpiry = 7 * 24 * 60 * 60 * 1000; // 7 jours
      
      if (cachedWords && cacheTimestamp) {
        const age = Date.now() - parseInt(cacheTimestamp);
        if (age < cacheExpiry) {
          wordsCache = JSON.parse(cachedWords);
          return wordsCache;
        }
      }
      
      // Charger avec fetch si pas en cache ou expiré
      const response = await fetch("words.json");
      const data = await response.json();
      
      // Mettre en cache
      try {
        localStorage.setItem('gameWords', JSON.stringify(data));
        localStorage.setItem('gameWordsTimestamp', Date.now().toString());
      } catch (e) {
        // Ignorer les erreurs de stockage
      }
      
      wordsCache = data;
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des mots:", error);
      // Mots de secours en cas d'erreur
      return ["PENDU", "JAVASCRIPT", "ORDINATEUR", "PROGRAMMATION", "INTERNET"];
    }
  }
  
  // Initialiser le jeu
  async function initGame() {
    const words = await loadWords();
    
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
    
    // Exposer la fonction globalement pour les commandes vocales
    window.guessLetter = guessLetter;

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

    const restartButton = document.getElementById("restartButton");
    if (restartButton) {
      restartButton.addEventListener("touchend", function () {
        location.reload();
      });
    }
  }
  
  // Démarrer le jeu
  initGame().catch(error => {
    console.error("Erreur lors de l'initialisation du jeu:", error);
  });

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
