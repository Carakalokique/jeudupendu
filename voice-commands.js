// Module de reconnaissance vocale pour le jeu du pendu
class VoiceCommands {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.statusElement = null;
    this.toggleButton = null;
    
    // Vérifier si l'API est disponible
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    } else {
      console.error('La reconnaissance vocale n\'est pas supportée par ce navigateur');
    }
  }

  setupRecognition() {
    // Configuration de la reconnaissance
    this.recognition.lang = 'fr-FR';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    // Gestionnaire de résultats
    this.recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript.toLowerCase().trim();
      
      console.log('Transcription:', transcript);
      this.processVoiceCommand(transcript);
    };

    // Gestionnaire d'erreurs
    this.recognition.onerror = (event) => {
      console.error('Erreur de reconnaissance vocale:', event.error);
      this.updateStatus(`Erreur: ${event.error}`, 'error');
      
      if (event.error === 'no-speech') {
        this.updateStatus('Aucune parole détectée', 'waiting');
      }
    };

    // Gestionnaire de fin
    this.recognition.onend = () => {
      if (this.isListening) {
        // Redémarrer automatiquement si toujours actif
        this.recognition.start();
      }
    };
  }

  processVoiceCommand(transcript) {
    // Nettoyer et traiter la commande
    let command = transcript.toLowerCase().replace(/[^a-zàâäéèêëïîôùûüÿæœç\s]/g, '');
    
    // Gérer les commandes spéciales
    if (command.includes('recommencer') || command.includes('nouveau jeu')) {
      // Sauvegarder l'état avant de recharger
      localStorage.setItem('voiceCommandActive', 'true');
      location.reload();
      return;
    }

    // Extraire une lettre de la commande
    let letter = '';
    
    // Vérifier si c'est une seule lettre
    if (command.length === 1 && /[a-z]/.test(command)) {
      letter = command;
    } 
    // Vérifier si c'est le nom d'une lettre (ex: "lettre a", "la lettre b")
    else if (command.includes('lettre')) {
      const match = command.match(/lettre\s+([a-z])/);
      if (match) {
        letter = match[1];
      }
    }
    // Vérifier les mots phonétiques pour certaines lettres
    else {
      const phoneticMap = {
        'ah': 'a', 'a': 'a',
        'bé': 'b', 'b': 'b',
        'cé': 'c', 'c': 'c',
        'dé': 'd', 'd': 'd',
        'euh': 'e', 'e': 'e',
        'ef': 'f', 'f': 'f',
        'gé': 'g', 'g': 'g',
        'ache': 'h', 'h': 'h',
        'i': 'i',
        'ji': 'j', 'j': 'j',
        'ka': 'k', 'k': 'k',
        'elle': 'l', 'l': 'l',
        'aime': 'm', 'm': 'm',
        'aine': 'n', 'n': 'n',
        'o': 'o',
        'pé': 'p', 'p': 'p',
        'ku': 'q', 'q': 'q',
        'erre': 'r', 'r': 'r',
        'esse': 's', 's': 's',
        'té': 't', 't': 't',
        'u': 'u',
        'vé': 'v', 'v': 'v',
        'double vé': 'w', 'w': 'w',
        'ixe': 'x', 'x': 'x',
        'i grec': 'y', 'y': 'y',
        'zède': 'z', 'z': 'z'
      };

      // Chercher une correspondance
      for (const [phonetic, actualLetter] of Object.entries(phoneticMap)) {
        if (command === phonetic || command.includes(phonetic)) {
          letter = actualLetter;
          break;
        }
      }
    }

    // Si une lettre valide a été trouvée, la proposer
    if (letter && /[a-z]/.test(letter)) {
      this.updateStatus(`"${letter.toUpperCase()}" reconnue`, 'success');
      
      // Appeler la fonction du jeu pour proposer la lettre
      if (typeof window.guessLetter === 'function') {
        window.guessLetter(letter);
      } else {
        // Si guessLetter n'est pas globale, simuler un clic sur le bouton
        const button = document.querySelector(`.keyboard-button[value="${letter}"]`);
        if (button) {
          button.click();
        }
      }
    } else {
      this.updateStatus('Non reconnue', 'error');
    }
  }

  start() {
    if (!this.recognition) {
      alert('La reconnaissance vocale n\'est pas disponible sur ce navigateur. Veuillez utiliser Chrome, Edge ou Safari.');
      return;
    }

    this.isListening = true;
    this.recognition.start();
    this.updateStatus('Écoute active...', 'listening');
    
    if (this.toggleButton) {
      this.toggleButton.classList.add('active');
      this.toggleButton.innerHTML = 'Arrêter la commande vocale';
    }
    
    // Sauvegarder l'état
    localStorage.setItem('voiceCommandActive', 'true');
  }

  stop() {
    this.isListening = false;
    if (this.recognition) {
      this.recognition.stop();
    }
    this.updateStatus('', 'stopped');
    
    if (this.toggleButton) {
      this.toggleButton.classList.remove('active');
      this.toggleButton.innerHTML = 'Activer la commande vocale';
    }
    
    // Supprimer l'état sauvegardé
    localStorage.removeItem('voiceCommandActive');
  }

  toggle() {
    if (this.isListening) {
      this.stop();
    } else {
      this.start();
    }
  }

  updateStatus(message, type = 'info') {
    if (this.statusElement) {
      this.statusElement.textContent = message;
      this.statusElement.className = `voice-status voice-status-${type}`;
      
      // Masquer le statut s'il est vide ou si c'est "stopped"
      if (!message || type === 'stopped') {
        this.statusElement.style.display = 'none';
      } else {
        this.statusElement.style.display = 'block';
      }
    }
  }

  init() {
    // Créer l'interface utilisateur
    const container = document.createElement('div');
    container.className = 'voice-control-container';
    
    // Bouton d'activation
    this.toggleButton = document.createElement('button');
    this.toggleButton.className = 'voice-toggle-button';
    this.toggleButton.innerHTML = 'Activer la commande vocale';
    this.toggleButton.onclick = () => this.toggle();
    
    // Statut
    this.statusElement = document.createElement('div');
    this.statusElement.className = 'voice-status';
    this.statusElement.style.display = 'none'; // Caché par défaut
    
    container.appendChild(this.toggleButton);
    container.appendChild(this.statusElement);
    
    // Insérer après le clavier
    const keyboard = document.querySelector('.keyboard');
    if (keyboard && keyboard.parentNode) {
      keyboard.parentNode.insertBefore(container, keyboard.nextSibling);
    }
    
    // Vérifier si les commandes vocales étaient actives avant
    if (localStorage.getItem('voiceCommandActive') === 'true') {
      // Retirer l'indicateur pour éviter une activation automatique infinie
      localStorage.removeItem('voiceCommandActive');
      // Activer automatiquement après un court délai
      setTimeout(() => {
        this.start();
      }, 500);
    }
  }
}

// Initialiser automatiquement quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  window.voiceCommands = new VoiceCommands();
  window.voiceCommands.init();
}); 