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
    }
}
exports.User = User; 