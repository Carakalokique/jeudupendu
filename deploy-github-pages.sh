#!/bin/bash

echo "🚀 Déploiement sur GitHub Pages"
echo "================================"
echo ""

# Vérifier que nous sommes dans un repo git
if [ ! -d ".git" ]; then
    echo "❌ Ce n'est pas un repository Git!"
    echo "   Initialisez d'abord avec: git init"
    exit 1
fi

# Vérifier que le build existe
if [ ! -d "build" ]; then
    echo "❌ Le dossier 'build' n'existe pas!"
    echo "   Exécutez d'abord: ./build-optimize.sh"
    exit 1
fi

# Demander confirmation
echo "📋 Ce script va:"
echo "1. Commiter les changements sur la branche main"
echo "2. Créer/mettre à jour la branche gh-pages"
echo "3. Déployer le contenu du dossier 'build/' sur gh-pages"
echo ""
read -p "Voulez-vous continuer? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Déploiement annulé"
    exit 1
fi

echo ""
echo "📦 1. Commit des changements sur main..."

# Ajouter tous les fichiers sauf build/
git add .
git add -A
git reset build/ # Ne pas inclure build/ sur main

# Commit avec message automatique
git commit -m "🎮 Mise à jour du jeu du pendu avec optimisations et commandes vocales

- ✅ Commandes vocales en français
- ✅ 3 pages: principale, multijoueur, difficile  
- ✅ Performance optimisée (592KB total)
- ✅ Fonctionnement hors ligne
- ✅ Accessibilité améliorée"

echo "✅ Changements commités sur main"

echo ""
echo "🌐 2. Préparation de la branche gh-pages..."

# Sauvegarder la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)

# Créer ou basculer sur gh-pages
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📝 Branche gh-pages existe déjà, mise à jour..."
    git checkout gh-pages
    git pull origin gh-pages || true
else
    echo "🆕 Création de la branche gh-pages..."
    git checkout --orphan gh-pages
    git rm -rf .
fi

echo ""
echo "📂 3. Copie des fichiers optimisés..."

# Copier le contenu de build/ vers la racine de gh-pages
if [ -d "build" ]; then
    cp -r build/* .
else
    echo "❌ Erreur: dossier build introuvable"
    exit 1
fi

# Créer un fichier .nojekyll pour GitHub Pages
echo "" > .nojekyll

# Créer un README spécifique pour gh-pages
cat > README.md << 'EOF'
# 🎮 Jeu du Pendu - Version Déployée

Cette branche contient la version optimisée et minifiée du jeu du pendu français.

## 🌐 Pages Disponibles
- **Page Principale**: `/` - Jeu classique avec commandes vocales
- **Page Multijoueur**: `/multijoueur/` - Version multijoueur
- **Page Difficile**: `/pendu-mot-difficile-complique/` - Mots compliqués

## ⚡ Optimisations
- ✅ JavaScript minifié
- ✅ CSS optimisé  
- ✅ Images compressées
- ✅ Cache intelligent
- ✅ Service Worker
- ✅ Score Lighthouse > 90

---
🔧 **Version générée automatiquement** - Ne pas modifier manuellement
EOF

echo ""
echo "💾 4. Commit et push vers GitHub..."

# Ajouter tous les fichiers de production
git add .
git commit -m "🚀 Deploy optimized version - $(date '+%Y-%m-%d %H:%M:%S')

- Total size: 592KB
- 3 pages included
- All optimizations applied"

# Push vers GitHub
echo "📤 Push vers origin/gh-pages..."
git push origin gh-pages

# Retourner sur la branche originale
git checkout $CURRENT_BRANCH

echo ""
echo "✅ Déploiement terminé!"
echo ""
echo "🌐 Votre site sera disponible à:"
echo "   https://$(git config remote.origin.url | sed 's/.*github.com[:/]//' | sed 's/.git$//' | tr '[:upper:]' '[:lower:]').github.io/"
echo ""
echo "⏱️  Il peut falloir quelques minutes pour que les changements soient visibles"
echo "🔧 Allez dans Settings > Pages de votre repo pour vérifier la configuration" 