# --- Étape 1 : Le Build ---
FROM node:24-alpine AS builder
WORKDIR /app

# On copie les fichiers de dépendances
COPY package*.json tsconfig.json ./
RUN npm install

# On copie le code source et on compile le TypeScript en JavaScript
COPY src/ ./src
RUN npx tsc

# --- Étape 2 : L'image de Production ---
FROM node:24-alpine
WORKDIR /app

# On ne copie QUE le package.json et les dépendances de prod pour gagner de la place
COPY package*.json ./
RUN npm install --omit=dev

# On récupère le code compilé (.js) de l'étape de build
COPY --from=builder /app/dist ./dist

# On lance l'agent
CMD ["node", "dist/index.js"]