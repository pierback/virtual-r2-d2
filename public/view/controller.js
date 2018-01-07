const { parseJSON, stringifyJSON, log } = require('/scripts/helper.js');

const { Robot } = require('../view/robot.js');
const { Act } = require('../view/actions/act.js');
const { React } = require('../view/actions/react.js');
const { Env } = require('../view/environment/env.js');
const user = require('../view/user.js');
const { move } = require('../view/actions/move.js');

//TO-DO: initialize user (only env), act, react with same object of r2-d2 and env 

const myEnv = new Env();
const robot = new Robot(myEnv);

const react = new React(robot, myEnv);
const act = new Act(robot, myEnv);
//move(robot, act, react, true);
/**
 * move(robot, act, react, balldisplayed = true || false);
 */


/* const ws = new WebSocket('ws://localhost:4000');
ws.onopen = function () {
    log('websocket is connected ...');
    const test = { port: 4000, print: 'test test' };
    ws.send(stringifyJSON(test));
};
ws.onmessage = function (ev) {
    const test = parseJSON(ev.data);
    test.print = 'new';
    setTimeout(() => {
        log(test);
        // ws.send(stringifyJSON(test));
    }, 3000);
}; */