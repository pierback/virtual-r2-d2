//@ts-checkts
const { moveRobot } = require('./act.js');
const { moveBall } = require('./react.js');

export function move(ballDisplayed = false, env, robot) {
    let _end = false;
    let _touchedEdges = 0;
    const direction = randSign();
    let _speed = 4 * direction;
    let _curRobotPosX = robot.getPosX() + 1;
    const _robotStartPosX = robot.x;

    const _interval = setInterval(() => {
        if (_end && Math.abs(robot.getPosX() - robot.x) <= 15) {
            stop();
        }
        if (_curRobotPosX <= robot.MinX || _curRobotPosX >= (robot.MaxX - 450)) {
            _speed = -_speed;
            _touchedEdges++;
            if (_touchedEdges == 2) _end = true;
            moveBall.switchSides(_speed);
        }
        _curRobotPosX += _speed;
        moveRobot(_curRobotPosX);
        ballDisplayed && moveBall(direction, _curRobotPosX);
    }, 5);


    const stop = () => {
        clearInterval(_interval);
        setSpeed();
        const stopInter = setInterval(() => {
            if (robot.x === _robotStartPosX) {
                clearInterval(stopInter);
                moveBall.hide();
            }
            _curRobotPosX += _speed;
            moveRobot(_curRobotPosX);
            ballDisplayed && moveBall(_curRobotPosX);
        }, 5);
    };

    const setSpeed = () => {
        robot.x > _robotStartPosX ? _speed = Math.abs(_speed) * -1 : _speed = Math.abs(_speed);
        _speed /= Math.abs(_speed);
    };

    const randSign = () => {
        const items = [-1, 1];
        return items[Math.floor(Math.random() * items.length)];
    };
}



