//@ts-check
const {
  parseJSON,
  stringifyJSON,
  getAllMethods,
  log
} = require('./public/scripts/helper.js');
const { Act } = require('./public/view/actions/act.js');
const { Environment } = require('./environment');
const { State } = require('./states');
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

let countCorrectAction = new Array();
const mode = 'easy';
const act = new Act();
const actions = act.getMethods(mode);
let environment = new Environment(mode);
const learner = new Learner(actions, environment.getStates());

let prevState = environment.getCurrentState();
let prevAction = learner.getNextAction(prevState);

init(false);

function init(test = true) {
  if (test) {
    const { test } = require('./test');
    let reaction = test(prevAction);
    for (let i = 0; i < 200; i++) {
      const action = learn(reaction, i);
      reaction = test(action);
    }
    log('done');
    log(Array(46).join(' '), actions);
    learner.qTablePrint();

    let tempArray = new Array();
    let counter = 0;
    for(let i = 0; i < countCorrectAction.length; i++){
      if(i % 10 === 0){
        tempArray.push(counter);
        counter = 0;
      }
      if(countCorrectAction[i]) counter++;
    }
    log(tempArray);
    init(false);
  } else {
    wss.on('connection', function (ws) {
      ws.on('message', function (message) {
        const reaction = message.toString();
        if (reaction === 'restart') {
          environment = new Environment(mode);
        }
        const action = learn(reaction);
        ws.send(action);
      });
    });
  }
}


function learn(reaction, i) {
  //log(prevAction, reaction);
  const prevCondition = environment.getConditionArray();//we need this here!! otherwise it will be overwritten in the next
  // step
  environment.update(prevAction, reaction);
  if (environment.isDead()) {
    environment = new Environment(mode);
    log(i, 'die');
  }
  //current state in numbers 
  const reward = environment.getReward(reaction, prevCondition);
  const curState = environment.getCurrentState();
  const curAction = learner.getNextAction(prevState); //why did we use the prevState??
  //const curAction = learner.getNextAction(curState);
  learner.updateLearner(reward, prevAction, prevState, curAction, curState);

  /*
  console.log(
    `${stringifyJSON(curState)} ${stringifyJSON(curAction)} reward: ${reward}`
  );
  */
  isCorrectAction(curAction, prevState);
  prevState = curState;
  prevAction = curAction;

  return curAction;
}

function isCorrectAction(action, state1){
  if(JSON.stringify(new State(true, false, true)) == JSON.stringify(state1)){
    //log("1 correct", action);
    if(action === 'waveArms') {
      countCorrectAction.push(true);
    } else {
      countCorrectAction.push(false);
    }
  } else if(JSON.stringify(new State(true, true, false)) === JSON.stringify(state1)){
    //log("2 correct", action);
      if(action === 'malfunction') {
          countCorrectAction.push(true);
      } else {
          countCorrectAction.push(false);
      }
  }else if(JSON.stringify(new State(true, true, true)) === JSON.stringify(state1)) {
      //log("3 correct", action);
      if (action === 'sleep') {
          countCorrectAction.push(true);
      } else {
          countCorrectAction.push(false);
      }
  } else if(JSON.stringify(new State(true, false, false)) === JSON.stringify(state1)){
    //log("31 correct", action);
      if(action === 'malfunction') {
          countCorrectAction.push(true);
      } else {
          countCorrectAction.push(false);
      }
  } else if(JSON.stringify(new State(false, true, true)) === JSON.stringify(state1)){
    //log("4 correct", action);
      if(action === 'smearMake') {
          countCorrectAction.push(true);
      } else {
          countCorrectAction.push(false);
      }
  }else if(JSON.stringify(new State(false, true, false)) === JSON.stringify(state1)){
    //log("5 correct", action);
      if(action === 'malfunction') {
          countCorrectAction.push(true);
      } else {
          countCorrectAction.push(false);
      }
  }else if(JSON.stringify(new State(false, false, true)) === JSON.stringify(state1)){
    //log("6 correct", action);
      if(action === 'waveArms' || action === 'smearMake') {
          countCorrectAction.push(true);
      } else {
          countCorrectAction.push(false);
      }
  }else if(JSON.stringify(new State(false, false, false)) === JSON.stringify(state1)){
    //log("7 correct", action);
      if(action === 'malfunction') {
          countCorrectAction.push(true);
      } else {
          countCorrectAction.push(false);
      }
  } else {
    //log('error', action);
    log(JSON.stringify(state1));
  }
}



server.listen(config.port, function listening() {
  log(`Listening on ${config.base_url}:${server.address().port}`);
});
