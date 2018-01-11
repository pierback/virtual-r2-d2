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
            case 'waveArms':
                this.wave();
                break;
            case 'peepMonoton':
                this.peepMonoton();
                break;
            case 'peepIrregular':
                this.peepIrregular();
                break;
            case 'circle':
                this.circle();
                break;
            case 'malfunction':
                this.malfunction();
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
        this._busy ? this.myEnv.disableButtons() : this.myEnv.enableButtons();
    }

    /**
     * act
     */

    wait() {
        const that = this;
        this.Busy = false;
        const wait = setTimeout(() => {
            if (!this._busy) {
                that.ws.send('noreaction');
            } else clearInterval(wait);
        }, 10000);
    }

    send(funcName) {
        this.ws.send(funcName.toString());
    }

    move(playBall) {
        this.Busy = true;
        Move(this.robot, this.act, this.react, playBall)
            .then(() => {
                playBall ? log('play ball finished') : log('move finished');
                playBall ? this.send('playball') : this.wait();
            });
    }

    wave() {
        this.Busy = true;
        this.act.waveArms()
            .then(() => {
                this.wait();
            });
    }

    peepIrregular() {
        this.Busy = true;
        this.act.peepIrregular()
            .then(() => {
                log('peepIrregular resolve');
                this.wait();
            });
    }

    peepMonoton() {
        this.Busy = true;
        this.act.peepMonoton()
            .then(() => {
                log('peepMonoton resolve');
                this.wait();
            });
    }

    circle() {
        this.Busy = true;
        this.act.circle()
            .then(() => {
                log('circle resolve');
                this.wait();
            });
    }

    malfunction() {
        this.Busy = true;
        this.act.malfunction()
            .then(() => {
                log('malfunction resolve');
                this.wait();
            });
    }

    /** 
     * react
    */
    happy() {
        this.Busy = true;
        this.react.happy()
            .then(() => {
                this.send('happy');
            });
    }

} new Controller();