//@ts-check
const { parseJSON, stringifyJSON, getAllMethods, log } = require('./public/scripts/helper.js');
const { Act } = require('./public/view/actions/act.js');
const config = require('./config');
const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const act = new Act();
const items = getAllMethods(act);

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/view/environment/index.html');
});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    const item = items[Math.floor(Math.random() * items.length)];
    log(item);
    ws.send(item.toString());
  });
});

server.listen(config.port, function listening() {
  log('Listening on %d', server.address().port);
});