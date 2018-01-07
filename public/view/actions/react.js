class React {
    constructor(robot, env) {
        this.env = env;
        this.robot = robot;
        this.ballItem = env.ballItem;
        console.log(this.ballItem);
        console.log(this.ballItem);
    }

    moveBall(dir, robotPosX) {
        let direction;
        dir < 0 ? direction = 200 : direction = -75;
        this.ballItem.style.left = this.robot.X + 18 + (direction) + 'px';
        this.ballItem.style.top = this.robot.Y + 175 + 'px';
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