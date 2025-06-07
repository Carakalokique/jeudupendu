#!/bin/bash

echo "🌐 Lancement du serveur de test local..."
echo "📂 Dossier: build/"
echo "🔗 URL: http://localhost:8000"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

cd build/
python3 -m http.server 8000 