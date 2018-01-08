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

}
exports.React = React;