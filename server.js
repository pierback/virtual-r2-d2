//@ts-check
const express = require('express');
const app = express();
const config = require('./config');
const path = require('path');
const { parseJSON, stringifyJSON } = require('./public/scripts/helper.js');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 4000 });

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/view/environment/index.html');
});

app.listen(config.port, function (res) {
  console.log(`Example app listening on port ${config.port}!`);
});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    const msg = parseJSON(message);
    console.log('action received: ', msg);
    ws.send('move');//setTimeout(() => ws.send('move'), 500);
  });
});

