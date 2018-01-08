const { Robot } = require('../view/robot.js');
const { Act } = require('../view/actions/act.js');
const { React } = require('../view/actions/react.js');
const { Env } = require('../view/environment/env.js');
const { User } = require('../view/user.js');
const { Move } = require('../view/actions/move.js');
const { AI } = require('../view/ai.js');

class Controller {
    constructor() {
        this.ai = new AI(this);
        this.myEnv = new Env();
        this.robot = new Robot(this.myEnv);
        this.user = new User(this.myEnv, this);
        this.act = new Act(this.robot, this.myEnv);
        this.react = new React(this.robot, this.myEnv);
    }

    move(playBall) {
        Move(this.robot, this.act, this.react, playBall);
    }
} new Controller();
