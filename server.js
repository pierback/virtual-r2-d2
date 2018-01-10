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

let tail = false;
wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('action received: ', message);
    tail = !tail;
    tail ? ws.send('peepMonoton') : ws.send('waveArms');//setTimeout(() => ws.send('move'), 500);
  });
});

