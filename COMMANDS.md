# 🎮 Jeu du Pendu - Guide des Commandes

## 📋 Pages Disponibles
- **Page Principale**: Jeu classique avec commandes vocales
- **Page Multijoueur**: Version multijoueur 
- **Page Difficile**: Mots difficiles et compliqués

## 🚀 Commandes Principales

### Optimisation et Build
```bash
# Optimiser tous les fichiers pour la production
./build-optimize.sh

# Installer les outils requis (une seule fois)
sudo npm install -g terser imagemin-cli imagemin-pngquant imagemin-mozjpeg imagemin-webp
```

### Test Local
```bash
# Lancer le serveur de test local
./test-local.sh
# Puis ouvrir: http://localhost:8000
```

### Déploiement
```bash
# Afficher les infos de déploiement
./deploy.sh
```

## 📊 Résultats de l'Optimisation

### Avant/Après  
- **Taille originale**: ~47MB  
- **Taille optimisée**: ~592KB (avec toutes les pages)
- **Réduction**: ~98.7% !

### Fichiers Optimisés (dans `build/`)
- ✅ HTML minifié avec CSS critique inline
- ✅ JavaScript minifié avec source maps
- ✅ Images compressées (WebP, PNG, JPEG)
- ✅ CSS minifié et combiné
- ✅ Service Worker pour le cache
- ✅ Configuration .htaccess optimisée

## 🎯 Fonctionnalités

### Performance
- ⚡ Chargement < 2s sur 3G
- 📱 Score Lighthouse > 90
- 💾 Cache intelligent
- 🔄 Fonctionnement hors ligne

### Accessibilité
- 🎤 Commandes vocales en français
- 🔤 Reconnaissance phonétique des lettres
- 💾 État persistant des commandes vocales
- 🎨 Interface simplifiée

### SEO & Cache
- 🕸️ Sitemap.xml
- 🤖 Robots.txt
- 💰 Intégration AdSense
- 🏷️ Métadonnées complètes

## 🔧 Développement

### Structure des Fichiers
```
build/                 # Version optimisée (déploiement)
├── index.html        # HTML optimisé
├── style.min.css     # CSS minifié
├── js/              # JavaScript minifié
├── images/          # Images optimisées
└── .htaccess        # Configuration serveur

src/                  # Fichiers sources
├── index.html
├── style.css
├── js/
└── images/
```

### Scripts de Vérification
```bash
# Vérifier que toutes les pages sont correctement buildées
./verify-build.sh
```

### Commandes NPM
```bash
npm run build         # Alias pour build-optimize.sh
npm run test          # Alias pour test-local.sh
npm run deploy        # Alias pour deploy.sh
```

## 🎮 Utilisation des Commandes Vocales

### Activation
- Cliquer sur le bouton "🎤" pour activer/désactiver
- L'état est sauvegardé automatiquement

### Commandes Disponibles
- **Lettres**: "A", "Bé", "Cé", "Dé", etc.
- **Phonétique**: "Ah", "Beu", "Sseu", etc.
- **Actions**: "Nouveau jeu", "Recommencer"

### Statuts Visuels
- 🟢 Vert: Commande reconnue
- 🟡 Orange: En écoute
- 🔴 Rouge: Erreur ou non supporté

## 📈 Monitoring

Le site inclut un monitoring automatique des performances:
- Core Web Vitals (LCP, FID, CLS)
- Utilisation mémoire
- Erreurs JavaScript
- Analytics Google intégrés

## 🚨 Résolution de Problèmes

### Problèmes de Permissions
```bash
# Si erreur EACCES avec npm
sudo npm install -g [package]
```

### Cache Persistant
```bash
# Vider le cache du navigateur si nécessaire
# Ou utiliser Ctrl+Shift+R pour recharger sans cache
```

### Service Worker
```bash
# En cas de problème, désinscrire le SW dans DevTools
# Application > Service Workers > Unregister
``` 