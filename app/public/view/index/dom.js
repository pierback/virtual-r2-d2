class Dom {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.overlay = document.getElementById('start-overlay');

        this.robot = document.getElementById('r2d2');
        this.head = document.getElementById('r2d2-head');
        this.legLeft = document.getElementById('left-leg');
        this.legRight = document.getElementById('right-leg');
        this.legFront = document.querySelectorAll('.foot') [1];
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

        this.btnPanel = document.getElementById('button-panel');
        this.startBtn = this.overlay.getElementsByTagName('a') [0];
        this.rechargeBtn = document.getElementById('recharge-btn');
        this.oilBtn = document.getElementById('oil-btn');
        this.repairBtn = document.getElementById('repair-btn');
        this.praiseBtn = document.getElementById('praise-btn');
        this.punishBtn = document.getElementById('punish-btn');
        this.nothingBtn = document.getElementById('nothing-btn');
        this.ballBtn = document.getElementById('ball-btn');

        this.btnPanel.style.background = 'rgba(0, 0, 0, 0.9)';

        this.initButtonArray();
        this.disableButtons();
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

    disableButtons(startup = false) {
        this.allBtns.map((btn) => {
            btn.disabled = true;
            btn.cursor = 'pointer';
        });
    }

    enableButtons() {
        this.allBtns.map((btn) => btn.disabled = false);
        this.btnPanel.style.background = '';
    }
}

exports.Dom = Dom;