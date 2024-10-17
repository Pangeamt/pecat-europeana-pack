# Usa una imagen base de Node.js
FROM node:20-alpine

# Define el directorio de trabajo
WORKDIR /app

# Instala pnpm globalmente y fastify
RUN npm install -g pnpm fastify

# Copia los archivos necesarios para instalar dependencias
COPY package.json ./

# Instala las dependencias usando pnpm
RUN pnpm install

# Copia el resto del código
COPY . .

# Expone el puerto en el que correrá Fastify
EXPOSE 3005

# Comando para iniciar la aplicación
CMD ["pnpm", "run", "start"]