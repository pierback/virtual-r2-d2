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
            const funcStr = ev.data.toString();
            switch (funcStr) {
                case 'move':
                    that.move();
                    break;
                case 'happy':
                    that.happy();
                    break;
                case '':
                    that.happy();
                    break;
                case 'd':
                    //controller.happy();
                    break;
                case 'b':
                    //controller.happy();
                    break;
                default:
                    break;
            }
        };
    }

    available() {
        if (!this._busy) return this._busy = true;
    }

    /**
     * act
     */

    wait() {
        this._busy = false;
        setTimeout(() => !this._busy && this.ws.send('noreaction'), 10000);
    }

    send(funcName) {
        this._busy = false;
        this.ws.send(funcName);
    }

    move(playBall) {
        //Move(this.robot, this.act, this.react, playBall);
        if (this.available())
            Move(this.robot, this.act, this.react, playBall)
                .then(() => {
                    log('move finished');
                    playBall ? this.send() : this.wait();
                });
    }

    /** 
     * react
    */
    happy() {
        if (this.available())
            this.react.happy()
                .then(() => {
                    this.send();
                });
    }

} new Controller();


