class Act {
    constructor(robot, env) {
        this.env = env;
        this.robot = robot;
    }

    moveRobot(rbPosX) {
        this.robot.X = rbPosX;
    }
}
exports.Act = Act;