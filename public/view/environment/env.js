class Env {
    constructor() {
        this.canvas = document.getElementById('canvas');

        this.robot = document.getElementById('r2d2');
        this.head = document.getElementById('r2d2-head');
        this.legLeft = document.getElementById('left-leg');
        this.legRight = document.getElementById('right-leg');
        this.legFront = document.querySelectorAll('.foot') [1];//document.getElementById('front-leg');
        this.dotCenter = document.getElementById('dot-center');
        this.dotRight = document.getElementById('dot-right');
        this.dotLeftUp = document.getElementById('dot-left-up');
        this.dotLeftBottom = document.getElementById('dot-left-bottom');

        this.ballItem = document.getElementById('ball-item');
        this.speachBubble = document.getElementById('talkbubble');
        this.smearItem = document.getElementById('smear-item');
        this.barrelItem = document.getElementById('barrel');
        this.chargeBar = document.getElementById('chargeBar');
        this.hammerItem = document.getElementById('hammer-item');
        this.moonItem = document.getElementById('moon-item');

        this.overlay = document.getElementById('start-overlay');

        this.rechargeBtn = document.getElementById('recharge-btn');
        this.oilBtn = document.getElementById('oil-btn');
        this.repairBtn = document.getElementById('repair-btn');
        this.praiseBtn = document.getElementById('praise-btn');
        this.punishBtn = document.getElementById('punish-btn');
        this.nothingBtn = document.getElementById('nothing-btn');
        this.ballBtn = document.getElementById('ball-btn');
        this.initButtonArray();
    }

    initButtonArray() {
        this.allBtns = [
            this.rechargeBtn,
            this.oilBtn,
            this.repairBtn,
            this.praiseBtn,
            this.punishBtn,
            this.nothingBtn,
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