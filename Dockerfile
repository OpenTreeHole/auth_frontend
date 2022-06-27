FROM node:lts-alpine as builder

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./entryPoint.sh /
RUN chmod +x entryPoint.sh

EXPOSE 80

ENTRYPOINT ["sh","/entryPoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

