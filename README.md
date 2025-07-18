# 🎮 Jeu du Pendu - Site Web Optimisé

## 🌐 Démo en Ligne

🎮 **Jouez maintenant** : [https://carakalokique.github.io/jeudupendu/](https://carakalokique.github.io/jeudupendu/)

### Pages Disponibles
- **Jeu Principal** : `/` - Avec commandes vocales françaises
- **Multijoueur** : `/multijoueur/` - Version collaborative  
- **Difficile** : `/pendu-mot-difficile-complique/` - Mots complexes

## ✨ Fonctionnalités

### 🎤 Accessibilité
- **Commandes vocales** en français pour personnes avec handicaps moteurs
- Reconnaissance phonétique des lettres ("ah" pour A, "bé" pour B, etc.)
- Interface simplifiée et intuitive
- État persistant des commandes vocales

### ⚡ Performance
- **Taille optimisée** : 592KB total (99% de réduction)
- **Chargement rapide** : < 2s sur 3G
- **Score Lighthouse** : > 90
- **Fonctionnement hors ligne** avec Service Worker

### 🎯 Multi-pages
- **3 modes de jeu** complets
- **Navigation fluide** entre les pages
- **Optimisation** de chaque page individuellement

## 🚀 Installation et Usage

### Prérequis
- Serveur web (Apache, Nginx, ou serveur local)
- Navigateur moderne avec support JavaScript
- Node.js et npm (pour les optimisations)

### 🛠️ Installation des Outils

```bash
# Installer les dépendances
npm install

# Installer les outils globaux (avec sudo si nécessaire)
sudo npm install -g terser imagemin-cli imagemin-pngquant imagemin-mozjpeg imagemin-webp
```

### 📦 Build de Production

```bash
# Créer une version optimisée (toutes les pages)
./build-optimize.sh

# Vérifier que toutes les pages sont incluses
./verify-build.sh
```

### 🌐 Test Local

```bash
# Servir la version optimisée localement
./test-local.sh
# Puis ouvrir: http://localhost:8000
```

## 🚀 Déploiement GitHub Pages

### Méthode Automatique (Recommandée)

```bash
# Déploiement en une commande
./deploy-github-pages.sh
```

Le script fait automatiquement :
- ✅ Commit des sources sur `main`
- ✅ Création de la branche `gh-pages`
- ✅ Copie des fichiers optimisés
- ✅ Push vers GitHub
- ✅ Configuration automatique

### Configuration GitHub

1. Allez dans `Settings > Pages` de votre repository
2. **Source** : `Deploy from a branch`
3. **Branch** : `gh-pages` / `/ (root)`
4. Cliquez sur `Save`

## 📊 Optimisations Implémentées

### 1. **Performance**
- JavaScript minifié avec source maps
- CSS critique inline
- Images optimisées (WebP, PNG, JPEG)
- Lazy loading du fichier words.json
- Cache intelligent localStorage (7 jours)

### 2. **Service Worker & Offline**
- Cache des ressources critiques
- Stratégie "Network First" pour HTML
- Stratégie "Cache First" pour assets
- Fonctionnement 100% hors ligne

### 3. **Browser Caching (.htaccess)**
- Compression GZIP pour tous les fichiers texte
- Cache 1 an pour images, 1 mois pour CSS/JS
- Headers optimisés pour la performance

### 4. **Monitoring**
- Core Web Vitals (LCP, FID, CLS)
- Monitoring utilisation mémoire
- Intégration Google Analytics

## 🎮 Utilisation des Commandes Vocales

### Activation
- Cliquer sur le bouton "🎤" pour activer/désactiver
- L'état est sauvegardé automatiquement

### Commandes Disponibles
- **Lettres** : "A", "Bé", "Cé", "Dé", etc.
- **Phonétique** : "Ah", "Beu", "Sseu", etc.
- **Actions** : "Nouveau jeu", "Recommencer"

### Statuts Visuels
- 🟢 Vert : Commande reconnue
- 🟡 Orange : En écoute
- 🔴 Rouge : Erreur ou non supporté

## 📈 Métriques de Performance

### Avant/Après Optimisation
- **Taille originale** : ~47MB
- **Taille optimisée** : ~592KB
- **Réduction** : 98.7% !

### Résultats Attendus
- Score Lighthouse > 90
- Temps de chargement < 2s sur 3G
- Fonctionnement offline complet
- Accessibilité AAA

## 🔧 Scripts Disponibles

```bash
./build-optimize.sh     # Optimiser toutes les pages
./verify-build.sh       # Vérifier le build
./test-local.sh         # Serveur local de test
./deploy-github-pages.sh # Déploiement GitHub Pages
./deploy.sh             # Infos de déploiement
```

## 📖 Documentation

- [Guide des Commandes](COMMANDS.md) - Référence complète
- [Guide de Déploiement](DEPLOYMENT.md) - Instructions détaillées

## 🐛 Support

Pour les questions ou problèmes :
1. Consultez d'abord [COMMANDS.md](COMMANDS.md)
2. Vérifiez [DEPLOYMENT.md](DEPLOYMENT.md) pour le déploiement
3. Testez localement avec `./test-local.sh`

---

🎯 **Jeu du pendu français optimisé, accessible et performant !**
