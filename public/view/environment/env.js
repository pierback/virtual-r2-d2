class Env {
    constructor() {
        this.canvas = document.getElementById('canvas');

        this.robot = document.getElementById('r2d2');
        this.legLeft = document.getElementById('left-leg');
        this.legRight = document.getElementById('right-leg');
        this.legFront = document.querySelectorAll('.foot') [1];//document.getElementById('front-leg');
        this.dotCenter = document.getElementById('dot-center');
        this.dotRight = document.getElementById('dot-right');
        this.dotLeftUp = document.getElementById('dot-left-up');
        this.dotLeftBottom = document.getElementById('dot-left-bottom');

        this.ballItem = document.getElementById('ball-item');

        this.rechargeBtn = document.getElementById('recharge-btn');
        this.oilBtn = document.getElementById('oil-btn');
        this.repairBtn = document.getElementById('repair-btn');
        this.speakBtn = document.getElementById('speak-btn');
        this.punishBtn = document.getElementById('punish-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.ballBtn = document.getElementById('ball-btn');
        this.initButtoArray();
    }

    initButtoArray() {
        this.allBtns = [
            this.rechargeBtn,
            this.oilBtn,
            this.repairBtn,
            this.speakBtn,
            this.punishBtn,
            this.stopBtn,
            this.ballBtn
        ];
    }

    disableBtns() {
        this.allBtns.map((btn) => btn.disabled = true);
    }

    enableBtns() {
        this.allBtns.map((btn) => btn.disabled = false);
    }
}
exports.Env = Env;