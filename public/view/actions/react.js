class React {
    constructor(robot, env) {
        this.env = env;
        this.robot = robot;
        this.ballItem = env.ballItem;
    }

    playBall(dir, robotPosX) {
        const leftOffset = -82;//manual set value
        const rightOffset = 75;//manual set value
        const offsetStart = dir > 0 ? rightOffset : leftOffset;
        this.ballItem.style.top = this.robot.Y + 106 + 'px'; //475px;
        this.ballItem.style.left = this.robot.X + offsetStart + 'px'; //370px;104
        this.ballItem.style.display = 'inline';

        const moveBall = (newDir) => {
            const offset = newDir > 0 ? rightOffset : leftOffset;
            this.ballItem.style.left = this.robot.Center + offset + 'px'; //370px;104
        };

        const hide = () => {
            this.ballItem.style.display = 'none';
        };

        this.playBall.hide = hide;
        this.playBall.moveBall = moveBall;
    }

    happy() {
        const that = this;
        return new Promise(function (resolve, reject) {
            const _curRobotPosX = that.robot.StartX + 1;
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


            const offset = 25;
            const robotOutOfRange = () => (_curRobotPosX <= (that.robot.MinY + offset) || _curRobotPosY >= (that.robot.MaxY - offset));
        });
    }

}
exports.React = React;