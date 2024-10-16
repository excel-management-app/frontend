
FROM node:22-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 3000

ENV VITE_API_URL=http://localhost:3001

CMD ["npm", "run", "preview"]
