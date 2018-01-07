class Env {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.leftRobotLeg = document.getElementById('left-leg');
        this.robot = document.getElementById('r2d2');
        this.ballItem = document.getElementById('ball-item');

        this.rechargeBtn = document.getElementById('recharge-btn');
        this.oilBtn = document.getElementById('oil-btn');
        this.repairBtn = document.getElementById('repair-btn');
        this.speakBtn = document.getElementById('speak-btn');
        this.punishBtn = document.getElementById('punish-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.ballBtn = document.getElementById('ball-btn"');
    }
}
exports.Env = Env;