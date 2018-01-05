//@ts-check
const express = require('express');
const app = express();
const config = require('./config');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 4000 });

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.port, function (res) {
  console.log(`Example app listening on port ${config.port}!`);
});

wss.on('connection', function (ws) {
  ws.send(`${new Date()}`);
  ws.on('message', function (message) {
    let msg = safelyParseJSON(message);
    console.log('received: ', msg);
    ws.send(`${msg}`);
  });
})

const safelyParseJSON = (res) => {
  let parsed;
  try {
    parsed = JSON.parse(res);
  } catch (e) {
    parsed = 'null';
  }
  return parsed;
}