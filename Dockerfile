FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

# Jalankan aplikasi
CMD ["npm", "run", "dev"]
