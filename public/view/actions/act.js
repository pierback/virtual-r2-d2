const { randSign } = require('../../scripts/helper.js');

class Act {
    constructor(robot, env) {
        this.env = env;
        this.robot = robot;
    }

    moveRobot(rbPosX) {
        this.robot.X = rbPosX;
    }

    circle() {
        const _curRobotPosX = this.robot.StartX + 1;
        let _curRobotPosY = this.robot.StartY + 1;
        let _speed = 4;
        let _touchedEdges = 0;

        const _moveInterval = setInterval(() => {
            if (robotOutOfRange()) {
                _speed = -_speed;
                _touchedEdges++;
            }
            _curRobotPosY += _speed;
            this.robot.Y = _curRobotPosY;
        }, 5);

        setTimeout(() => {
            clearInterval(_moveInterval);
            this.robot.Y = this.robot.StartY;
        }, 2000);


        const offset = 25;
        const robotOutOfRange = () => (_curRobotPosX <= (this.robot.MinY + offset) || _curRobotPosY >= (this.robot.MaxY - offset));
    }
}
exports.Act = Act;