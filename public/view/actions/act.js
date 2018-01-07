class Act {
    constructor(env, robot) {
        this.env = env;
        this.robot = robot;
    }

    moveRobot(rbPosX) {
        this.robot.X = rbPosX;
    }

}
exports.Act = Act;