FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 3002

# Jalankan aplikasi
CMD ["npm", "run", "dev"]
