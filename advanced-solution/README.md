# Advanced notifications provider

Advanced notification service verifies users twice - first using e-mail, then using debot. This allows it to connect multiple transports to deliver notifications such as e-mail, http, telegram and other in any numbers. This approach provides better scalability and flexibility.
**In practice this means that a domain owner can connect his application to this notification service and all the users of the application can get their own notifications privately.**
Description of General Architecture
![2021-10-15 19 00 15](https://user-images.githubusercontent.com/12598254/137551533-ded6fe2e-65e1-4fcc-a993-da029d87c868.jpg)

https://github.com/radianceteam/http-notification-query-provider/blob/main/Sol2Architect.jpg 


[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE)
[![Build Status](https://app.travis-ci.com/radianceteam/http-notifs.svg?token=vtAnTcCydEX1soCiVqz4&branch=master)](https://app.travis-ci.com/radianceteam/http-notifs)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)


_**Http Notifs** — A microservice oriented webservice delivering messages from blockchain_

## Getting started

We assume that you already have [Docker](https://www.docker.com/) installed on your machine.

1. At first install all dependencies and let [Lerna](https://lerna.js.org/) to link cross-dependencies.

```sh
npm install
```

2. Set environment variables

```sh
# packages/kafka-client/.env
KAFKA_URL=
KAFKA_USERNAME=
KAFKA_PASSWORD=
KAFKA_TOPIC=

# services/user-handler/.env
MAIL_HOST=
MAIL_PORT=
MAIL_LOGIN=
MAIL_PASSWORD=
```

3. Start dev environment

```sh
npm start
```

Now you can develop 🎉

## Deploy

Deploy as simple as:

1. Adding private rsa file (that has access to your remote server) in the project root with name `deploy-rsa`
2. Set environment variables from "Getting started" above
3. Run `npm run deploy`

Project deployed 🎉

## Packages

- 📃 [kafka-client](packages/kafka-client) — Kafka client interface library
- ⚡ [redis-client](packages/redis-client) — Redis client interface library
- ✍ [logger](packages/logger) — Log utility
- 🔎 [validation](packages/validation) - Common validation for frontend and backend

## Services

- 🦄 [front](services/front) — _CRA React web app with MUI UI library_
- 🔑 [user-handler](services/user-handler) — _Server for user authorization and CRUD operations with webhooks_
- 🎣 [http-transport](services/http-transport) — _Transporter for sending messages to webhook_
- 🤖 [debot-handler](services/debot-handler) — _Listener on DeBot contract_
- 🐱‍👤 [log-server](services/log-server) - _Saving logs_

## General Architecture

![General Architecture Schema](https://github.com/radianceteam/http-notifs/blob/master/general_architecture.png?raw=true)
