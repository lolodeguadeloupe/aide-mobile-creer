
# Étape de build
FROM node:22-alpine AS builder

# Déclarer les arguments de build pour les secrets Supabase
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY

# Les rendre disponibles comme variables d'environnement pour le build Vite
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY bun.lockb ./
COPY pnpm-lock.yaml ./

# Nettoyer le cache npm et supprimer node_modules s'ils existent
RUN rm -rf node_modules package-lock.json

# Installer npm et les dépendances en utilisant la dernière version
RUN npm install -g npm@latest
RUN npm install

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Étape de production
FROM nginx:alpine

# Installer curl pour le healthcheck
RUN apk add --no-cache curl

# Supprimer les fichiers par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
