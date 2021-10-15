'use strict';

const express = require('express');
const { createServer } = require('http');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

const { libNode } = require('@tonclient/lib-node')
const { TonClient } = require('@tonclient/core')

TonClient.useBinaryLibrary(libNode)
const client = TonClient.default

//
// The server's public key. WILL NOT be changed.
//
const SERVICE_KEYS = { pub: 'a36bf515ee8de6b79d30b294bbe7162f5e2a45b95ea97e4baebab8873492ee43' };

// Keys displayed by DeBot
let CLIENT_KEYS = {
  pub: '213962341527dd6038e5f1954faca05eb3be74424365ae8e733d25fcd61fc809',
  sec: '5f5d0942dec7dff59b19e61f0f616d6eb8e8937c2873a0395ac93ec2e5ee0689',
};

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.post('/setkeys', async function (req, res) {
  CLIENT_KEYS.pub = req.body.pub;
  CLIENT_KEYS.sec = req.body.sec;
  console.log(CLIENT_KEYS);
  console.log('CLIENT_KEYS setted');
  res.status(200).send('OK');
});

let notificationMsg = {count:0, info:'waiting data from radianceteam/http-notification-provider', body: {nounce: '', encodedMessage: ''}}

app.post('/notification', async function (req, res) {
  notificationMsg.count ++;
  notificationMsg.info = 'receive notification from radianceteam/http-notification-provider'
  const kafkaMsg = req.body.encodedMessage;
  const [idempKey, nonceBase64, encrypted] = kafkaMsg.split(' ');
  const { decrypted } = await client.crypto.nacl_box_open({
    encrypted,
    nonce: Buffer.from(nonceBase64, 'base64').toString('hex'),
    their_public: SERVICE_KEYS.pub,
    secret: CLIENT_KEYS.sec,
  });
  const base64ToUtf8 = (b) => Buffer.from(b, 'base64').toString('utf8');
  notificationMsg.body = {nounce: req.body.nounce, encodedMessage: base64ToUtf8(decrypted)};
  console.log(notificationMsg);
  console.log('Receive notification from radianceteam/http-notification-provider');
  wss.clients.forEach((client) => {
    try {
      client.send(JSON.stringify(notificationMsg), (error) => {
        if (typeof error !== "undefined") {
          console.log(`Send Error: ${error.toString()}`)
        }
      })
    } catch (e) {
      console.log(`Broadcast Error: ${e.toString()}`)
    }
  })
  res.status(200).send('OK');
});

wss.on('connection', function (ws) {
  console.log('started client interval');
  ws.send(JSON.stringify(notificationMsg), function () {});

  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
});

//
// Start the server.
//
server.listen(5050, function () {
  console.log('Listening on http://localhost:5050');
});
