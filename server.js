//@ts-check
const express = require('express');
const app = express();
const config = require('./config');
const path = require('path');
const { parseJSON, stringifyJSON, getAllMethods } = require('./public/scripts/helper.js');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 4000 });

const { Act } = require('./public/view/actions/act.js');
const act = new Act();
const items = getAllMethods(act);

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/view/environment/index.html');
});
app.listen(config.port, function (res) {
  console.log(`Example app listening on port ${config.base_url}:${config.port}!`);
});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    const item = items[Math.floor(Math.random() * items.length)];
    console.log(item);
    ws.send(item.toString());
  });
});

