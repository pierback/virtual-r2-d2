//@ts-check
const express = require('express');
const app = express();
const config = require('./config');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 4000 });

app.use(express.static(__dirname + '/view'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/view/index.html');
});

app.listen(config.port, function (res) {
  console.log(`Example app listening on port ${config.port}!`);
});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    const msg = safelyParseJSON(message);
    msg.print = 'new test';
    console.log('received: ', msg);
    ws.send(JSON.stringify(msg));
  });
});

const safelyParseJSON = (res) => {
  let parsed;
  try {
    parsed = JSON.parse(res);
  } catch (e) {
    parsed = 'null';
  }
  return parsed;
};