FROM node:21-slim as builder

WORKDIR /usr/src/app
COPY .env /usr/src/app/
COPY package.json /usr/src/app/package.json

RUN npm install --silent

COPY . /usr/src/app
RUN npm run build

FROM nginx:latest

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]