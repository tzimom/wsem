FROM node:21-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:21-slim as app
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build ./app/dist ./dist
ENV NODE_ENV production
CMD ["npm", "start"]
