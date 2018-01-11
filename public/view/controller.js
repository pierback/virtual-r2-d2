const { parseJSON, stringifyJSON, log, randSign } = require('/scripts/helper.js');
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

    updateCanvas(){
        this.robot.updateSize();
    }

    _initializeSocket() {
        const that = this;
        this.ws = new WebSocket('ws://localhost:4000');
        this.ws.onopen = function () {
            log('websocket is connected ...');
        };
        this.ws.onmessage = function (ev) {
            this.that = true;
            setTimeout(() => that.evalActFunc(ev.data), 1200);
        };
    }

    evalActFunc(funcName) {
        switch (funcName) {
            case 'moveRobot':
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

    get Busy() {
        return this._bus;
    }

    toggleBtns() {
        this._busy ? this.myEnv.disableButtons() : this.myEnv.enableButtons();
    }

    /**
     * act
     */

    wait() {
        log('wait');
        const that = this;
        that.Busy = false;
        //waits 10 sec, if no user action then ask server for new action
        const waitInterval = setTimeout(() => {
            if (!that._busy) {
                that.myEnv.disableButtons();
                log('no reaction');
                that.ws.send('noreaction');
            }
            clearInterval(checkBusy);
        }, 6000);
        //on wait: watches busy-var if changes state to true, clearTimeout and interval,
        //cos user has activated new action
        const checkBusy = setInterval(() => {
            if (that._busy) {
                log('clear wait interval');
                clearTimeout(waitInterval);
                clearInterval(checkBusy);
            }
        }, 50);
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
                log('peepIrregular finished');
                this.wait();
            });
    }

    peepMonoton() {
        this.Busy = true;
        this.act.peepMonoton()
            .then(() => {
                log('peepMonoton finished');
                this.wait();
            });
    }

    circle() {
        this.Busy = true;
        this.act.circle()
            .then(() => {
                log('circle finished');
                this.wait();
            });
    }

    malfunction() {
        this.Busy = true;
        this.act.malfunction()
            .then(() => {
                log('malfunction finished');
                this.wait();
            });
    }

    /** 
     * react
    */
    praise() {
        this.Busy = true;
        this.react.praise()
            .then(() => {
                log('praise finished');
                this.send('praise');
            });
    }

}
c = new Controller();

window.onresize = function(event) {
    c.updateCanvas();
};