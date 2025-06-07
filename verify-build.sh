#!/bin/bash

echo "🔍 Vérification du build optimisé..."
echo "===================================="
echo ""

# Vérifier que le dossier build existe
if [ ! -d "build" ]; then
    echo "❌ Le dossier 'build' n'existe pas!"
    echo "   Exécutez d'abord: ./build-optimize.sh"
    exit 1
fi

echo "📊 Taille totale du build:"
du -sh build/
echo ""

echo "🏠 Page principale:"
if [ -f "build/index.html" ]; then
    echo "✅ index.html ($(wc -c < build/index.html) bytes)"
else
    echo "❌ index.html manquant"
fi

echo ""
echo "👥 Page Multijoueur:"
if [ -f "build/multijoueur/index.html" ]; then
    echo "✅ multijoueur/index.html ($(wc -c < build/multijoueur/index.html) bytes)"
    if [ -f "build/multijoueur/js/YourGameScriptMultijoueur.min.js" ]; then
        echo "✅ JS minifié ($(wc -c < build/multijoueur/js/YourGameScriptMultijoueur.min.js) bytes)"
    else
        echo "❌ JS minifié manquant"
    fi
    if [ -f "build/multijoueur/wordsplayer.json" ]; then
        echo "✅ wordsplayer.json ($(wc -c < build/multijoueur/wordsplayer.json) bytes)"
    else
        echo "❌ wordsplayer.json manquant"
    fi
else
    echo "❌ multijoueur/index.html manquant"
fi

echo ""
echo "🔥 Page Difficile:"
if [ -f "build/pendu-mot-difficile-complique/index.html" ]; then
    echo "✅ pendu-mot-difficile-complique/index.html ($(wc -c < build/pendu-mot-difficile-complique/index.html) bytes)"
    if [ -f "build/pendu-mot-difficile-complique/js/YourGameScriptDifficiles.min.js" ]; then
        echo "✅ JS minifié ($(wc -c < build/pendu-mot-difficile-complique/js/YourGameScriptDifficiles.min.js) bytes)"
    else
        echo "❌ JS minifié manquant"
    fi
    if [ -f "build/pendu-mot-difficile-complique/wordsdifficiles.json" ]; then
        echo "✅ wordsdifficiles.json ($(wc -c < build/pendu-mot-difficile-complique/wordsdifficiles.json) bytes)"
    else
        echo "❌ wordsdifficiles.json manquant"
    fi
else
    echo "❌ pendu-mot-difficile-complique/index.html manquant"
fi

echo ""
echo "🎨 Ressources communes:"
if [ -f "build/style.min.css" ]; then
    echo "✅ style.min.css ($(wc -c < build/style.min.css) bytes)"
else
    echo "❌ style.min.css manquant"
fi

if [ -f "build/js/YourGameScript.min.js" ]; then
    echo "✅ YourGameScript.min.js ($(wc -c < build/js/YourGameScript.min.js) bytes)"
else
    echo "❌ YourGameScript.min.js manquant"
fi

if [ -f "build/js/voice-commands.min.js" ]; then
    echo "✅ voice-commands.min.js ($(wc -c < build/js/voice-commands.min.js) bytes)"
else
    echo "❌ voice-commands.min.js manquant"
fi

echo ""
echo "🌐 URLs à tester localement (http://localhost:8000):"
echo "• Page principale: /"
echo "• Page multijoueur: /multijoueur/"
echo "• Page difficile: /pendu-mot-difficile-complique/"
echo ""

echo "✅ Vérification terminée!" 