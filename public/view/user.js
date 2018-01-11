class User {
    constructor(env, controller) {
        this.rechargeBtn = env.rechargeBtn;
        this.oilBtn = env.oilBtn;
        this.repairBtn = env.repairBtn;
        this.praiseBtn = env.praiseBtn;
        this.punishBtn = env.punishBtn;
        this.nothingBtn = env.nothingBtn;
        this.ballBtn = env.ballBtn;
        this.controller = controller;
        this._initializeListeners();
    }
    _initializeListeners() {
        this.ballBtn.addEventListener('click', () => {
            this.controller.move(true);
        });
        this.rechargeBtn.addEventListener('click', () => {
            this.controller.charge();
        });
        this.oilBtn.addEventListener('click', () => {
            this.controller.oil();
        });
        this.repairBtn.addEventListener('click', () => {
            console.log('this.controller.repair()');
        });
        this.praiseBtn.addEventListener('click', () => {
            this.controller.praise();
        });
        this.punishBtn.addEventListener('click', () => {
            console.log('this.controller.punish()');
        });
        this.nothingBtn.addEventListener('click', () => {
            console.log('this.controller.nothing()');
        });

        const that = this;
        window.onkeyup = function (e) {
            const key = e.keyCode ? e.keyCode : e.which;
            if (key === 49 || key === 65) {
                that.rechargeBtn.click();
            } else if (key === 50 || key === 83) {
                that.oilBtn.click();
            } else if (key === 51 || key === 68) {
                console.log('this.controller.repair()');
            } else if (key == 52 || key === 70) {
                that.ballBtn.click();
            } else if (key == 53 || key === 71) {
                that.praiseBtn.click();
            } else if (key == 54 || key === 72) {
                console.log('this.controller.punish()');
            } else if (key == 55 || key === 74) {
                console.log('this.controller.stop()');
            }
        };
    }
}
exports.User = User; 