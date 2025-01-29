# Usa una imagen base de Node.js
FROM node:20-alpine

# Instalar git y otras herramientas necesarias
RUN apk add --no-cache git

# Define el directorio de trabajo
WORKDIR /app

# Clona el repositorio de pecat-tm
RUN git clone https://github.com/Pangeamt/pecat-tm.git .

COPY .env ./

# Instala pnpm globalmente y fastify
RUN npm install -g pnpm fastify

# # Copia los archivos necesarios para instalar dependencias
# COPY package.json ./

# Instala las dependencias usando pnpm
RUN pnpm install

# # Copia el resto del código
# COPY . .

# Expone el puerto en el que correrá Fastify
EXPOSE 3005

# Comando para iniciar la aplicación
CMD ["pnpm", "run", "start"]