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
        const barrel = new Item(this.env.barrelItem);
        barrel.show();
        barrel.Animation = 'fallinTop 1s ease';
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                barrel.hide();
                resolve();
            }, 3000);
        });
    }

}
exports.React = React;