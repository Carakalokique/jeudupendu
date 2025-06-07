#!/bin/bash

echo "🚀 Script de déploiement du jeu du pendu"
echo "========================================"
echo ""

# Vérifier que le dossier build existe
if [ ! -d "build" ]; then
    echo "❌ Le dossier 'build' n'existe pas!"
    echo "   Exécutez d'abord: ./build-optimize.sh"
    exit 1
fi

echo "📊 Taille des fichiers optimisés:"
du -sh build/
echo ""

echo "📋 Contenu du dossier build:"
ls -la build/
echo ""

echo "🔧 Options de déploiement:"
echo "1. Copier les fichiers manuellement depuis le dossier 'build/'"
echo "2. Utiliser rsync (si configuré)"
echo "3. Utiliser GitHub Pages"
echo "4. Utiliser un autre service d'hébergement"
echo ""

echo "🎮 Pages incluses:"
echo "• Page principale: index.html"
echo "• Page multijoueur: multijoueur/index.html"
echo "• Page difficile: pendu-mot-difficile-complique/index.html"
echo ""

echo "📝 Instructions:"
echo "• Pour un hébergement classique: copiez tout le contenu du dossier 'build/' vers votre serveur"
echo "• Pour GitHub Pages: poussez le contenu de 'build/' vers la branche gh-pages"
echo "• Assurez-vous que le fichier .htaccess est supporté par votre hébergeur"
echo "• Testez toutes les pages: /, /multijoueur/, /pendu-mot-difficile-complique/"
echo ""

echo "✅ Prêt pour le déploiement!"
echo "📂 Tous les fichiers optimisés sont dans le dossier 'build/'" 