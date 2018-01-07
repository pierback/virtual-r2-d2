class User {
    constructor(env, event) {
        this.rechargeBtn = env.rechargeBtn;
        this.oilBtn = env.oilBtn;
        this.repairBtn = env.repairBtn;
        this.speakBtn = env.speakBtn;
        this.punishBtn = env.punishBtn;
        this.stopBtn = env.stopBtn;
        this.ballBtn = env.ballBtn;
        //this._initializeListeners();

        event();
    }
    _initializeListeners() {
        this.ballBtn.addEventListener('click', () => {

        });
    }
}
exports.User = User; 