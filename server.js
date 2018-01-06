//@ts-check
const express = require('express');
const app = express();
const config = require('./config');
const { parseJSON, stringifyJSON } = require('./public/scripts/helper.js');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 4000 });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/view/index.html');
});

app.listen(config.port, function (res) {
  console.log(`Example app listening on port ${config.port}!`);
});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    const msg = parseJSON(message);
    msg.print = 'new test';
    console.log('received: ', msg);
    ws.send(JSON.stringify(msg));
  });
});

