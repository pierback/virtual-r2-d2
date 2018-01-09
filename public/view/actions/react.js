class React {
    constructor(robot, env, Item) {
        this.env = env;
        this.robot = robot;
        this.ballItem = new Item(env.ballItem);
    }

    playBall(dir, robotPosX) {
        this.ballItem.show();
        const ballWidth = this.ballItem.Width;
        const leftOffset = -ballWidth - this.robot.Width/2;//manual set value
        const rightOffset = this.robot.Width/2;//manual set value
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

}
exports.React = React;