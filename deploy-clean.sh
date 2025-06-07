#!/bin/bash

echo "🚀 Déploiement PROPRE sur GitHub Pages"
echo "======================================="
echo ""
echo "Ce script va:"
echo "1. Construire la version optimisée"
echo "2. Nettoyer complètement la branche gh-pages"
echo "3. Déployer UNIQUEMENT le contenu optimisé"
echo ""

# Vérifier qu'on est sur main
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️ Vous devez être sur la branche main"
    echo "Changement vers main..."
    git checkout main
fi

# 1. Construire la version optimisée
echo "📦 1. Construction de la version optimisée..."
./build-optimize.sh

if [ ! -d "build" ]; then
    echo "❌ Erreur: Le dossier build n'a pas été créé"
    exit 1
fi

# 2. Sauvegarder le contenu du build
echo "💾 2. Sauvegarde du contenu optimisé..."
TEMP_DIR="/tmp/jeudupendu-deploy-$(date +%s)"
mkdir -p "$TEMP_DIR"
cp -R build/. "$TEMP_DIR/"

echo "✅ Contenu sauvegardé dans: $TEMP_DIR"

# 3. Nettoyer et recréer la branche gh-pages
echo "🧹 3. Nettoyage de la branche gh-pages..."

# Supprimer la branche gh-pages locale
git branch -D gh-pages 2>/dev/null || echo "Branche gh-pages n'existait pas localement"

# Créer une nouvelle branche gh-pages orpheline
git checkout --orphan gh-pages

# Supprimer tous les fichiers de git
git rm -rf . 2>/dev/null || echo "Aucun fichier à supprimer"

# 4. Copier uniquement le contenu optimisé
echo "📂 4. Copie du contenu optimisé..."
cp -R "$TEMP_DIR"/. .

# Ajouter le fichier .nojekyll pour GitHub Pages
echo "" > .nojekyll

# 5. Commit et push
echo "💾 5. Commit des fichiers optimisés..."
git add .
git commit -m "🚀 Clean deploy - optimized files only - $(date '+%Y-%m-%d %H:%M:%S')"

echo "📤 6. Push vers GitHub..."
git push origin gh-pages --force

# 6. Retourner sur main et nettoyer
echo "🔄 7. Retour sur main..."
git checkout main

echo "🧹 8. Nettoyage du dossier temporaire..."
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Déploiement PROPRE terminé!"
echo ""
echo "🌐 La branche gh-pages contient maintenant UNIQUEMENT:"
echo "   - Les fichiers HTML optimisés"
echo "   - Les fichiers CSS/JS minifiés"
echo "   - Les images optimisées"
echo "   - Les fichiers de configuration (.htaccess, robots.txt, etc.)"
echo ""
echo "🚫 Elle ne contient PLUS:"
echo "   - Les fichiers source (.js non-minifiés)"
echo "   - node_modules/"
echo "   - Les scripts de build"
echo "   - Les fichiers de développement"
echo ""
echo "🌐 Votre site sera disponible à:"
echo "   https://carakalokique.github.io/jeudupendu/"
echo ""
echo "⏱️ Il peut falloir quelques minutes pour que les changements soient visibles" 