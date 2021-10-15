FROM node:14-alpine as builder
ARG SERVICE
WORKDIR /usr/src/app

RUN apk add --no-cache --virtual .gyp python make g++

COPY --chown=node:node package*.json lerna.json ./
COPY --chown=node:node packages/ ./packages
COPY --chown=node:node services/${SERVICE} ./services/${SERVICE}
RUN npm install --loglevel notice --unsafe-perm

RUN apk del .gyp

FROM node:14-alpine
ARG SERVICE
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

WORKDIR /usr/src/app/services/${SERVICE}
RUN npm run build 

EXPOSE 3000
CMD ["npm", "start"]