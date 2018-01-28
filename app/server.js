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

let prevState = environment.getCurrentState();
let prevAction = learner.getNextAction(prevState);

init(true);

function init(test) {
  if (test) {
    const { test } = require('./test');
    let reaction = test(prevAction);
    for (let i = 0; i < 1000; i++) {
      const action = learn(reaction);
      reaction = test(action);
    }
    log(learner.QTable);
  } else {
    wss.on('connection', function (ws) {
      ws.on('message', function (message) {
        const reaction = message.toString();
        const action = learn(reaction);
        ws.send(action);
      });
    });
  }
}

function learn(reaction) {
  environment.update(prevAction, reaction);
  //current state in numbers 
  const reward = environment.getReward(reaction);
  const curState = environment.getCurrentState();
  const curAction = learner.getNextAction(prevState);
  learner.updateLearner(reward, prevAction, prevState, curAction, curState);
  console.log(
    `${stringifyJSON(curAction)} reward: ${reward}`
  );
  prevState = curState;
  prevAction = curAction;

  return curAction;
}

server.listen(config.port, function listening() {
  log(`Listening on ${config.base_url}:${server.address().port}`);
});
