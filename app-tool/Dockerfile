# Usa una imagen base de Node.js 20
FROM node:20-alpine

# Instalar git y otras herramientas necesarias
RUN apk add --no-cache git openssl
 

# Define el directorio de trabajo
WORKDIR /app

# Clona el repositorio de pecat-europeana-v1
RUN git clone https://github.com/Pangeamt/pecat-europeana-v1.git .

COPY .env ./

# Instala pnpm globalmente
RUN npm install -g pnpm

# # Copia solo package.json y pnpm-lock.yaml (si lo tienes)
# COPY package.json ./

# Instala las dependencias usando pnpm
RUN pnpm install

# # Copia el resto del código de la aplicación
# COPY . .

# Asegura que el directorio public/files exista y otorga permisos
RUN mkdir -p public/files && chmod -R 755 public/files

# Genera el cliente Prisma y compila el proyecto
# RUN npx prisma migrate dev --name "initial_migration" --schema=./prisma/schema.prisma
# RUN npx prisma migrate deploy --schema=./prisma/schema.prisma


RUN pnpm run build

# Expone el puerto en el que Next.js correrá
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "run", "start"]