class Env {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.robot = document.getElementById('r2d2');
        this.leftRobotLeg = document.getElementById('left-leg');
        this.frontRobotLeg = document.querySelectorAll('.foot') [1];//document.getElementById('front-leg');
        this.ballItem = document.getElementById('ball-item');

        this.rechargeBtn = document.getElementById('recharge-btn');
        this.oilBtn = document.getElementById('oil-btn');
        this.repairBtn = document.getElementById('repair-btn');
        this.speakBtn = document.getElementById('speak-btn');
        this.punishBtn = document.getElementById('punish-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.ballBtn = document.getElementById('ball-btn');
        this.initButtonArray();
    }

    initButtonArray() {
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

    disableButtons() {
        this.allBtns.map((btn) => btn.disabled = true);
    }

    enableButtons() {
        this.allBtns.map((btn) => btn.disabled = false);
    }
}
exports.Env = Env;