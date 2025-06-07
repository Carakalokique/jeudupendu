#!/bin/bash

# Script d'optimisation pour le jeu du pendu
# Nécessite: terser (npm install -g terser) et imagemin-cli (npm install -g imagemin-cli)

echo "🚀 Début de l'optimisation des ressources..."

# Créer le dossier de build s'il n'existe pas
mkdir -p build
mkdir -p build/js
mkdir -p build/images
mkdir -p build/multijoueur
mkdir -p build/multijoueur/js
mkdir -p build/pendu-mot-difficile-complique
mkdir -p build/pendu-mot-difficile-complique/js

# Minifier les fichiers JavaScript
echo "📦 Minification des fichiers JavaScript..."

# Minifier YourGameScript.js
if command -v terser &> /dev/null; then
    terser YourGameScript.js -o build/js/YourGameScript.min.js \
        --compress \
        --mangle \
        --source-map "url='YourGameScript.min.js.map'"
    echo "✅ YourGameScript.js minifié"
    
    terser voice-commands.js -o build/js/voice-commands.min.js \
        --compress \
        --mangle \
        --source-map "url='voice-commands.min.js.map'"
    echo "✅ voice-commands.js minifié"
    
    terser sw.js -o build/js/sw.min.js \
        --compress \
        --mangle
    echo "✅ sw.js minifié"
    
    # Minifier les JS des pages spécialisées
    terser multijoueur/YourGameScriptMultijoueur.js -o build/multijoueur/js/YourGameScriptMultijoueur.min.js \
        --compress \
        --mangle \
        --source-map "url='YourGameScriptMultijoueur.min.js.map'"
    echo "✅ YourGameScriptMultijoueur.js minifié"
    
    terser pendu-mot-difficile-complique/YourGameScriptDifficiles.js -o build/pendu-mot-difficile-complique/js/YourGameScriptDifficiles.min.js \
        --compress \
        --mangle \
        --source-map "url='YourGameScriptDifficiles.min.js.map'"
    echo "✅ YourGameScriptDifficiles.js minifié"
    
    # Minifier performance-monitor.js
    terser performance-monitor.js -o build/js/performance-monitor.min.js \
        --compress \
        --mangle
    echo "✅ performance-monitor.js minifié"
else
    echo "⚠️  Terser non installé. Installez avec: npm install -g terser"
fi

# Optimiser les images
echo "🖼️  Optimisation des images..."

# Vérifier si imagemin est installé
if command -v imagemin &> /dev/null; then
    # Optimiser les PNG
    imagemin "*.png" --out-dir=build/images --plugin=pngquant
    
    # Optimiser les JPG
    imagemin "*.jpg" --out-dir=build/images --plugin=mozjpeg
    
    echo "✅ Images optimisées"
else
    echo "⚠️  Imagemin non installé. Installez avec: npm install -g imagemin-cli imagemin-pngquant imagemin-mozjpeg"
fi

# Créer une version minifiée du CSS
echo "🎨 Minification du CSS..."

# Simple minification CSS (suppression des espaces et commentaires)
cat style.css | \
    sed 's/\/\*[^*]*\*\///g' | \
    sed 's/\s\+/ /g' | \
    sed 's/;\s/;/g' | \
    sed 's/:\s/:/g' | \
    sed 's/{\s/{/g' | \
    sed 's/\s}/}/g' | \
    sed 's/,\s/,/g' > build/style.min.css

echo "✅ CSS minifié"

# Créer un fichier HTML optimisé
echo "📄 Optimisation du HTML..."

# Copier le HTML principal et remplacer les références
cp index.html build/index.html

# Remplacer les références aux fichiers minifiés dans le HTML de build
sed -i.bak 's/YourGameScript.js/js\/YourGameScript.min.js/g' build/index.html
sed -i.bak 's/voice-commands.js/js\/voice-commands.min.js/g' build/index.html
sed -i.bak 's/style.css/style.min.css/g' build/index.html
sed -i.bak 's/sw.js/js\/sw.min.js/g' build/index.html
sed -i.bak 's/performance-monitor.js/js\/performance-monitor.min.js/g' build/index.html
sed -i.bak 's/favicon.png/favicon.ico/g' build/index.html

# Supprimer les fichiers de backup
rm build/index.html.bak

# Optimiser la page Multijoueur
cp multijoueur/index.html build/multijoueur/index.html
sed -i.bak 's/YourGameScriptMultijoueur.js/js\/YourGameScriptMultijoueur.min.js/g' build/multijoueur/index.html
sed -i.bak 's/..\/style.css/..\/style.min.css/g' build/multijoueur/index.html
sed -i.bak 's/..\/favicon.png/..\/favicon.ico/g' build/multijoueur/index.html
rm build/multijoueur/index.html.bak

# Optimiser la page Difficile
cp pendu-mot-difficile-complique/index.html build/pendu-mot-difficile-complique/index.html
sed -i.bak 's/YourGameScriptDifficiles.js/js\/YourGameScriptDifficiles.min.js/g' build/pendu-mot-difficile-complique/index.html
sed -i.bak 's/..\/style.css/..\/style.min.css/g' build/pendu-mot-difficile-complique/index.html
sed -i.bak 's/favicon.png/..\/favicon.ico/g' build/pendu-mot-difficile-complique/index.html
rm build/pendu-mot-difficile-complique/index.html.bak

echo "✅ HTML optimisé (toutes les pages)"

# Copier les autres fichiers nécessaires
echo "📋 Copie des autres fichiers..."
cp words.json build/
cp robots.txt build/
cp sitemap.xml build/
cp ads.txt build/
cp CNAME build/
cp .htaccess build/
cp favicon.ico build/

# Copier les fichiers JSON des pages spécialisées
cp multijoueur/wordsplayer.json build/multijoueur/
cp pendu-mot-difficile-complique/wordsdifficiles.json build/pendu-mot-difficile-complique/

# Calculer la taille des économies
echo ""
echo "📊 Rapport d'optimisation:"
echo "------------------------"

# Taille originale
original_size=$(du -sh . --exclude=build --exclude=.git | cut -f1)
echo "Taille originale: $original_size"

# Taille optimisée
optimized_size=$(du -sh build | cut -f1)
echo "Taille optimisée: $optimized_size"

echo ""
echo "✨ Optimisation terminée! Les fichiers optimisés sont dans le dossier 'build/'"
echo ""
echo "📝 Pour déployer, utilisez les fichiers du dossier 'build/'"
echo "⚠️  N'oubliez pas de tester le site localement avant le déploiement!" 