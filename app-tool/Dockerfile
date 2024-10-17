# Usa una imagen base de Node.js 20
FROM node:20-alpine

# Define el directorio de trabajo
WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia solo package.json y pnpm-lock.yaml (si lo tienes)
COPY package.json ./

# Instala las dependencias usando pnpm
RUN pnpm install

# Copia el resto del código de la aplicación
COPY . .

# Asegura permisos de lectura y escritura en la carpeta public/files y
# genera el cliente Prisma y compila el proyecto antes de exponer el puerto
RUN chmod -R 755 public/files && npx prisma generate && pnpm run build

# Expone el puerto en el que Next.js correrá
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "run", "start"]