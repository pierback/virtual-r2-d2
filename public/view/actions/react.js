class React {
    constructor(robot, env) {
        this.env = env;
        this.robot = robot;
        this.ballItem = env.ballItem;
    }

    moveBall(dir, robotPosX) {
        let direction;
        dir < 0 ? direction = 200 : direction = -75;
        this.ballItem.style.left = Math.floor(this.robot.X) + 15 + 'px';
        this.ballItem.style.top = Math.floor(this.robot.Y) + 40 + 'px';
        this.ballItem.style.display = 'inline';

        const hide = () => {
            this.ballItem.style.display = 'none';
        };

        const switchSides = (_block) => {
            this.ballItem.style.left = this.robot.X + 75 + 'px';
            this.ballItem.style.top = this.robot.Y - 175 + 'px';
        };

        this.moveBall.switchSides = switchSides;
        this.moveBall.hide = hide;
    }

}
exports.React = React;