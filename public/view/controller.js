const { parseJSON, stringifyJSON, log } = require('/scripts/helper.js');
const { Robot } = require('../view/robot.js');
const { Act } = require('../view/actions/act.js');
const { React } = require('../view/actions/react.js');
const { Item } = require('../view/environment/item.js');
const { Env } = require('../view/environment/env.js');
const { User } = require('../view/user.js');
const { Move } = require('../view/actions/move.js');


class Controller {
    constructor() {
        this.myEnv = new Env();
        this.robot = new Robot(this.myEnv);
        this.user = new User(this.myEnv, this);
        this.act = new Act(this.robot, this.myEnv);
        this.react = new React(this.robot, this.myEnv, Item);
        this._busy = false;
        this._initializeSocket();
    }

    _initializeSocket() {
        const that = this;
        this.ws = new WebSocket('ws://localhost:4000');
        this.ws.onopen = function () {
            log('websocket is connected ...');
        };
        this.ws.onmessage = function (ev) {
            this._busy = true;
            setTimeout(() => that.evalActFunc(ev.data), 1200);
        };
    }

    evalActFunc(funcName) {
        switch (funcName) {
            case 'move':
                this.move();
                break;
            case 'adsf':
                break;
            default:
                break;
        }

    }

    set Busy(bsy) {
        this._busy = bsy;
        this.toggleBtns();
    }

    toggleBtns() {
        this._busy ? this.myEnv.disableBtns() : this.myEnv.enableBtns();
    }

    /**
     * act
     */

    wait() {
        this.Busy = false;
        setTimeout(() => !this._busy && this.ws.send('noreaction'), 10000);
    }

    send(funcName) {
        //this.Busy = false;
        this.ws.send(funcName);
    }

    move(playBall) {
        this.Busy = true;
        Move(this.robot, this.act, this.react, playBall)
            .then(() => {
                playBall ? log('play ball finished') : log('move finished');
                playBall ? this.send() : this.wait();
            });
    }

    /** 
     * react
    */
    happy() {
        this.Busy = true;
        this.react.happy()
            .then(() => {
                this.send();
            });
    }

} new Controller();


