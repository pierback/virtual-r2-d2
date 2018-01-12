//@ts-check
const express = require('express');
const app = express();
const config = require('./config');
const path = require('path');
const { parseJSON, stringifyJSON, getAllMethods } = require('./public/scripts/helper.js');
const { Act } = require('./public/view/actions/act.js');
const act = new Act();
const items = getAllMethods(act);
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/view/environment/index.html');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    const item = items[Math.floor(Math.random() * items.length)];
    console.log(item);
    ws.send(item.toString());
  });
});

server.listen(config.port, function listening() {
  console.log('Listening on %d', server.address().port);
});