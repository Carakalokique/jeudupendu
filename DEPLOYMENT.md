# 🚀 Guide de Déploiement GitHub Pages

## 📋 Prérequis

1. **Repository GitHub** configuré
2. **Fichiers optimisés** générés (`./build-optimize.sh`)
3. **Git** configuré localement

## 🔧 Méthode Automatique (Recommandée)

### 1. Exécuter le script de déploiement
```bash
chmod +x deploy-github-pages.sh
./deploy-github-pages.sh
```

Le script fait automatiquement :
- ✅ Commit des sources sur `main`
- ✅ Création de la branche `gh-pages`
- ✅ Copie des fichiers optimisés
- ✅ Push vers GitHub
- ✅ Configuration automatique

### 2. Configurer GitHub Pages

1. Allez sur votre repository GitHub
2. `Settings` > `Pages`
3. **Source** : `Deploy from a branch`
4. **Branch** : `gh-pages` / `/ (root)`
5. Cliquez sur `Save`

## 🌐 URLs Finales

Votre site sera accessible à :
```
https://VOTRE-USERNAME.github.io/NOM-DU-REPO/
```

### Pages disponibles :
- **Principale** : `/`
- **Multijoueur** : `/multijoueur/`
- **Difficile** : `/pendu-mot-difficile-complique/`

## 🛠️ Méthode Manuelle

### 1. Préparer les sources
```bash
# Optimiser les fichiers
./build-optimize.sh

# Commit sur main
git add .
git commit -m "🎮 Optimisations du jeu du pendu"
git push origin main
```

### 2. Créer la branche gh-pages
```bash
# Créer branche orpheline
git checkout --orphan gh-pages
git rm -rf .

# Copier les fichiers optimisés
cp -r build/* .
echo "" > .nojekyll

# Commit et push
git add .
git commit -m "🚀 Deploy to GitHub Pages"
git push origin gh-pages

# Retourner sur main
git checkout main
```

## 🔄 Mises à Jour

Pour chaque mise à jour :

```bash
# 1. Modifier vos fichiers sources
# 2. Régénérer le build
./build-optimize.sh

# 3. Redéployer
./deploy-github-pages.sh
```

## 🐛 Résolution de Problèmes

### Site non accessible
- ⏱️ Attendre 5-10 minutes après le déploiement
- 🔍 Vérifier `Settings > Pages` sur GitHub
- 📝 Vérifier que la branche `gh-pages` existe

### Erreurs 404
- ✅ Vérifier que `index.html` est à la racine de `gh-pages`
- ✅ Vérifier les chemins relatifs dans le HTML
- ✅ Vérifier que `.nojekyll` existe

### Problèmes de Performance
- 🚀 Le site optimisé charge en < 2s
- 📱 Score Lighthouse > 90
- 💾 Fonctionne hors ligne grâce au Service Worker

## 📊 Monitoring

Une fois déployé, vous pouvez :
- 📈 Suivre les performances via les DevTools
- 🔍 Analyser avec Lighthouse
- 📊 Voir les statistiques GitHub Pages

## 🎯 Domaine Personnalisé (Optionnel)

Pour utiliser votre propre domaine :

1. Créer un fichier `CNAME` dans `build/` avec votre domaine
2. Configurer les DNS chez votre registrar
3. Activer HTTPS dans `Settings > Pages`

Exemple `CNAME` :
```
jeudupendu.com
``` 