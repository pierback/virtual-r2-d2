const { parseJSON, stringifyJSON, log, randSign } = require('/scripts/helper.js');
const { Robot } = require('../view/robot.js');
const { Act } = require('../view/actions/act.js');
const { React } = require('../view/actions/react.js');
const { Item } = require('../view/index/item.js');
const { Dom } = require('../view/index/dom.js');
const { User } = require('../view/user.js');
const { Move } = require('../view/actions/move.js');

let count = 0;

class Controller {
    constructor() {
        this.dom = new Dom();
        this.robot = new Robot(this.dom);
        this.user = new User(this.dom, this);
        this.act = new Act(this.robot, this.dom);
        this.react = new React(this.robot, this.dom, Item);
        this._busy = false;
        this._initializeSocket();
    }

    updateCanvas() {
        this.robot.updateSize();
    }

    start() {
        this.dom.overlay.style.width = '0%';
        this.dom.enableButtons();
        this.ws.send('noreaction');
    }

    restart() {
        this.dom.overlay.style.width = '0%';
        this.dom.enableButtons();
        this.ws.send('restart');
    }

    _initializeSocket() {
        const that = this;
        const HOST = location.origin.replace(/^http/, 'ws');
        this.ws = new WebSocket(HOST);

        this.ws.onopen = function () {
            log('websocket is connected ...');
        };
        this.ws.onmessage = function (ev) {
            that.Busy = true;
            setTimeout(() => that.evalActFunc(ev.data), 1200);
        };
    }

    evalActFunc(funcName) {
        count++;
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
            case 'smearMake':
                this.smearMake();
                break;
            case 'smearRemove':
                this.smearRemove();
                break;
            case 'sleep':
                this.sleep();
                break;
            case 'die':
                this.die();
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
        return this._busy;
    }

    toggleBtns() {
        this.Busy ? this.dom.disableButtons() : this.dom.enableButtons();
    }

    wait() {
        log('wait');
        const that = this;
        that.Busy = false;
        //waits 5 sec, if no user action then ask server for new action
        const waitInterval = setTimeout(() => {
            if (!that.Busy) {
                that.dom.disableButtons();
                that.noReaction();
                //log('no reaction');
                //that.ws.send('noreaction');
            }
            clearInterval(checkBusy);
        }, 5000);
        //on wait: watches busy-var if changes state to true, clearTimeout and interval,
        //cos user has activated new action
        const checkBusy = setInterval(() => {
            if (that.Busy) {
                log('clear wait interval');
                clearTimeout(waitInterval);
                clearInterval(checkBusy);
            }
        }, 50);
    }

    send(funcName) {
        this.ws.send(funcName.toString());
    }

    /**
     * act
     * sorted alphabetically
     */

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

    move(playBall) {
        this.Busy = true;
        Move(this.robot, this.act, this.react, playBall)
            .then(() => {
                playBall ? log('play ball finished') : log('move finished');
                playBall ? this.send('playball') : this.wait();
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

    smearMake() {
        this.Busy = true;
        this.act.smearMake()
            .then(() => {
                log('smearMake finished');
                this.wait();
            });
    }

    smearRemove() {
        this.Busy = true;
        this.act.smearRemove()
            .then(() => {
                log('smearRemove finished');
                this.wait();
            });
    }

    sleep() {
        this.Busy = true;
        this.act.sleep()
            .then(() => {
                log('sleep finished');
                this.wait();
            });
    }

    wave() {
        this.Busy = true;
        this.act.waveArms()
            .then(() => {
                log('waving finished');
                this.wait();
            });
    }

    /**
     * react
     */

    charge() {
        this.Busy = true;
        this.react.charge()
            .then(() => {
                log('charge finished');
                this.send('charge');
            });
    }

    die() {
        count--;
        console.log('count', count);
        count = 0;
        this.Busy = true;
        this.react.die()
            .then(() => {
                log('die finished');
                this.dom.overlay.style.width = 'inherit';
                this.dom.disableButtons();
                this.dom.blacknPanel();
                if (this.dom.startBtn.className !== 'w3-hide') {
                    this.dom.startBtn.className = 'w3-hide';

                }
                this.dom.restartBtn.className = this.dom.restartBtn.className.replace('w3-hide', '');
            });
    }


    noReaction() {
        this.Busy = true;
        this.react.noReaction()
            .then(() => {
                log('noReaction finished');
                this.send('noreaction');
            });
    }

    oil() {
        this.Busy = true;
        this.react.oil()
            .then(() => {
                log('oil finished');
                this.send('oil');
            });
    }

    praise() {
        this.Busy = true;
        this.react.praise()
            .then(() => {
                log('praise finished');
                this.send('praise');
            });
    }

    punish() {
        this.Busy = true;
        this.react.punish()
            .then(() => {
                log('punish finished');
                this.send('punish');
            });
    }

    repair() {
        this.Busy = true;
        this.react.repair()
            .then(() => {
                log('repair finished');
                this.send('repair');
            });
    }


}

const c = new Controller();


window.onresize = function (event) {
    c.updateCanvas();
};