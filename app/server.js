//@ts-check
const {
  parseJSON,
  stringifyJSON,
  getAllMethods,
  log
} = require('./public/scripts/helper.js');
const { Act } = require('./public/view/actions/act.js');
const { Environment } = require('./environment');
const { Learner } = require('./learner');
const config = require('./config');
const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/view/index/index.html');
});

const mode = 'easy';
const act = new Act();
const actions = act.getMethods(mode);
const environment = new Environment(mode);
const learner = new Learner(actions, environment.getStates());

let prevAction;
let prevState;

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    //const conArr = environment.getConditionArray();
    const reaction = message.toString();
    environment.update(prevAction, reaction);
    const reward = environment.getReward(reaction, prevState);//<--- previous conArr
    learner.updateTable(prevState, reward, prevAction);
    //prevAction = actions[Math.floor(Math.random() * actions.length)];
    prevState = environment.getStates();//environment.getCurrentState();
    prevAction = learner.getNextAction(prevState);
    console.log(
      `${stringifyJSON(environment.getConditionArray())} reward: ${reward}`
    );
    ws.send(prevAction.toString());
  });
});

server.listen(config.port, function listening() {
  log(`Listening on ${config.base_url}:${server.address().port}`);
});
