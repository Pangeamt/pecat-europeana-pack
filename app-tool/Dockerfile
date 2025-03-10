# Usa una imagen base de Node.js 20
FROM node:20-alpine

# Instalar herramientas necesarias
RUN apk add --no-cache git openssl

# Define el directorio de trabajo
WORKDIR /app

# Clona el repositorio directamente de la rama main
RUN git clone --branch main https://github.com/Pangeamt/pecat-europeana-v1.git .

# Copia el archivo .env
COPY .env ./

# Instala pnpm globalmente
RUN npm install -g pnpm

# Limpia la caché de pnpm para evitar conflictos
# RUN pnpm store prune

# Instala las dependencias
RUN pnpm install 

# Asegura permisos para el directorio public/files
RUN mkdir -p public/files && chmod -R 777 public/files

# Genera el cliente Prisma y realiza migraciones
RUN pnpm prisma generate
RUN pnpm prisma migrate deploy

# Construye el proyecto Next.js
RUN pnpm run build

# Expone el puerto
EXPOSE 3000

# Inicia la aplicación Next.js
CMD ["pnpm", "run", "start"]
