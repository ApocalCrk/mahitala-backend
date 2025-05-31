FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3321

# Jalankan aplikasi
CMD ["npm", "run", "dev"]
