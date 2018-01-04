var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/ws.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ port: 40510 })

wss.on('connection', function (ws) {
  ws.send(`${new Date()}`);
  ws.on('message', function (message) {
    try {
      let msg = JSON.parse(message);
      console.log('received: ', msg);
      delete msg.print;
      ws.send(`${msg}`);
    } catch (error) {
      //console.log('received: ', message);
    }

  });
})