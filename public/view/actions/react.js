class React {
    constructor(robot, env, Item) {
        this.env = env;
        this.robot = robot;
        this.ballItem = new Item(env.ballItem);
    }

    playBall(dir, robotPosX) {
        log('playBall');
        this.ballItem.show();
        const ballWidth = this.ballItem.Width;
        const leftOffset = -ballWidth - this.robot.Width / 2;//manual set value
        const rightOffset = this.robot.Width / 2;//manual set value
        const offsetStart = dir > 0 ? rightOffset : leftOffset;
        this.ballItem.Y = this.robot.Y + 106; //475px;
        this.ballItem.X = this.robot.X + offsetStart; //370px;104


        const moveBall = (newDir) => {
            const offset = newDir > 0 ? rightOffset : leftOffset;
            this.ballItem.X = this.robot.CenterX + offset; //370px;104
        };

        const hide = () => {
            this.ballItem.hide();
        };

        this.playBall.hide = hide;
        this.playBall.moveBall = moveBall;
    }

    praise() {
        log('praise');
        const that = this;
        return new Promise(function (resolve, reject) {
            let _curRobotPosY = that.robot.StartY + 1;
            let _speed = 4;
            let _touchedEdges = 0;

            const _moveInterval = setInterval(() => {
                if (robotOutOfRange()) {
                    _speed = -_speed;
                    _touchedEdges++;
                }
                _curRobotPosY += _speed;
                that.robot.Y = _curRobotPosY;
            }, 5);

            setTimeout(() => {
                clearInterval(_moveInterval);
                that.robot.Y = that.robot.StartY;
                resolve();
            }, 1000);


            const offset = 125;
            const robotOutOfRange = () => (_curRobotPosY <= (that.robot.MinY + offset) || _curRobotPosY >= (that.robot.MaxY - offset));
        });
    }

    oil() {
        log('oil');
        const barrel = new Item(this.env.barrelItem);
        barrel.X = this.robot.X;
        barrel.show();
        barrel.Animation = 'fallin 2.5s';
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                barrel.hide();
                resolve();
                barrel.resetAnimation();
            }, 3000);
        });
    }

    charge() {
        log('charge');
        const chargeBar = new Item(this.env.chargeBar);
        chargeBar.X = this.robot.X - 10;
        chargeBar.show(2);
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                chargeBar.hide();
                resolve();
            }, 3000);
        });
    }

    punish() {
        log('punish');
        const canvas = this.env.canvas;
        const robot = new Item(this.env.robot);
        const bubble = new Item(this.env.speachBubble);
        canvas.style.filter = 'grayscale(1)';
        bubble.X = this.robot.X + this.robot.Width - 40;
        bubble.Y = this.robot.Y - 10 - this.robot.Height / 2;
        bubble.Text = '😢';
        bubble.show(1);
        robot.Animation = 'shaking 1s 1s 3';

        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                bubble.hide(1);
                canvas.style.filter = 'none';
                robot.resetAnimation();
                resolve();
            }, 3000);
        });
    }

    sleep() {
        log('sleep');
        const bubble = new Item(this.env.speachBubble);
        bubble.X = this.robot.X + this.robot.Width - 40;
        bubble.Y = this.robot.Y - 10 - this.robot.Height / 2;
        bubble.Text = '💤';
        bubble.show(1);
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                bubble.hide(1);
                resolve();
            }, 3000);
        });
    }

}
exports.React = React;