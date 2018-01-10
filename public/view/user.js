class User {
    constructor(env, controller) {
        this.rechargeBtn = env.rechargeBtn;
        this.oilBtn = env.oilBtn;
        this.repairBtn = env.repairBtn;
        this.speakBtn = env.speakBtn;
        this.punishBtn = env.punishBtn;
        this.stopBtn = env.stopBtn;
        this.ballBtn = env.ballBtn;
        this.controller = controller;
        this._initializeListeners();
    }
    _initializeListeners() {
        this.ballBtn.addEventListener('click', () => {
            this.controller.move(true);
        });
        this.rechargeBtn.addEventListener('click', () => {
            console.log('this.controller.recharge()');
        });
        this.oilBtn.addEventListener('click', () => {
            console.log('this.controller.spillOil()');
        });
        this.repairBtn.addEventListener('click', () => {
            console.log('this.controller.repair()');
        });
        this.speakBtn.addEventListener('click', () => {
            this.controller.happy();
        });
        this.punishBtn.addEventListener('click', () => {
            console.log('this.controller.punish()');
        });
        this.stopBtn.addEventListener('click', () => {
            console.log('this.controller.stop()');
        });

        const that = this;
        window.onkeyup = function (e) {
            let key = e.keyCode ? e.keyCode : e.which;
            if (key === 49) {
                console.log('this.controller.recharge()');
            } else if (key === 50) {
                console.log('this.controller.spillOil()');
            } else if (key === 51) {
                console.log('this.controller.repair()');
            } else if (key == 52) {
                that.ballBtn.click();
            } else if (key == 53) {
                that.speakBtn.click();
            } else if (key == 54) {
                console.log('this.controller.punish()');
            } else if (key == 55) {
                console.log('this.controller.stop()');
            }
        };
    }
}
exports.User = User; 