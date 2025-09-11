
#!/bin/bash

# Script de build robuste pour la production
echo "🚀 Début du build de production..."

# Nettoyer les dépendances existantes
echo "🧹 Nettoyage des dépendances..."
rm -rf node_modules
rm -f package-lock.json

# Installer les dépendances avec npm
echo "📦 Installation des dépendances..."
npm install

# Build de l'application
echo "🔨 Build de l'application..."
npm run build

echo "✅ Build terminé avec succès!"
