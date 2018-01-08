const { parseJSON, stringifyJSON, log } = require('/scripts/helper.js');

const { Robot } = require('../view/robot.js');
const { Act } = require('../view/actions/act.js');
const { React } = require('../view/actions/react.js');
const { Env } = require('../view/environment/env.js');
const { User } = require('../view/user.js');
const { move } = require('../view/actions/move.js');
//const event = require('events').EventEmitter;

//TO-DO: initialize user (only env), act, react with same object of r2-d2 and env 

const myEnv = new Env();
const robot = new Robot(myEnv);

const react = new React(robot, myEnv);
const act = new Act(robot, myEnv);

function test() {
    console.log('tests');
}
const user = new User(myEnv, test);
move(robot, act, react, true);

/**
 * move(robot, act, react, balldisplayed = true || false);
 */
