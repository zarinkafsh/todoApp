FROM docker.arvancloud.ir/node:latest AS build
WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]