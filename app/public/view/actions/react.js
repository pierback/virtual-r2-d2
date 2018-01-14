class React {
    constructor(robot, env, Item) {
        this.dom = env;
        this.robot = robot;
        this.ballItem = new Item(env.ballItem);
    }

    charge() {
        log('charge');
        const chargeBar = new Item(this.dom.chargeBar);
        chargeBar.X = this.robot.X - 10;
        chargeBar.show(2);
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                chargeBar.hide();
                resolve();
            }, 3000);
        });
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

    oil() {
        log('oil');
        const barrel = new Item(this.dom.barrelItem);
        barrel.X = this.robot.X;
        barrel.show();
        barrel.Animation = 'fallin 2.5s';

        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                barrel.hide();
                barrel.resetAnimation();
                resolve();
            }, 3000);
        });
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

    repair() {
        log('repair');
        const robot = new Item(this.dom.robot);
        const hammer = new Item(this.dom.hammerItem);

        hammer.X = this.robot.MaxX / 2 - 20;
        hammer.Y = this.robot.Y - 20;
        hammer.show();
        const sound = new Audio('res/Hammering.mp3');
        sound.volume = 0.2;
        hammer.Animation = 'repair 1s 1';
        sound.play();

        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                hammer.hide();
                hammer.resetAnimation();
                resolve();
            }, 2000);
        });
    }


    punish() {
        log('punish');
        const canvas = this.dom.canvas;
        const robot = new Item(this.dom.robot);
        const bubble = new Item(this.dom.speachBubble);
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

    die() {
        const robot = new Item(this.dom.robot);
        const center = new Item(this.dom.dotCenter);
        center.Animation = 'loosePower 4s';
        robot.Animation = 'fallOver 4s';

        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                [center, robot].map((el) => el.resetAnimation());
                resolve();
            }, 4000);
        });
    }

    noReaction() {
        log('noReaction');
        const head = new Item(this.dom.head);
        head.Animation = 'moveHead 1s 1';

        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                head.resetAnimation();
                resolve();
            }, 1200);
        });
    }

}
exports.React = React;