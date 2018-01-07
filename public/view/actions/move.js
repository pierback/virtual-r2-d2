//@ts-checkts
exports.move = (robot, act, react, ballDisplayed = false) => {
    let _curRobotPosX = robot.X + 1;
    const _robotStartPosX = robot.x;
    const direction = randSign();
    let _speed = 4 * direction;
    let _touchedEdges = 0;
    let _end = false;

    const _interval = setInterval(() => {
        if (_end && Math.abs(robot.X - _robotStartPosX) <= 15) {
            stop();
        }
        if (_curRobotPosX <= robot.MinX || _curRobotPosX >= (robot.MaxX - 450)) {
            _speed = -_speed;
            _touchedEdges++;
            if (_touchedEdges == 2) _end = true;
            ballDisplayed && react.moveBall.switchSides(_speed);
        }
        _curRobotPosX += _speed;
        act.moveRobot(_curRobotPosX);
        ballDisplayed && react.moveBall(direction, _curRobotPosX);
    }, 5);


    const stop = () => {
        clearInterval(_interval);
        setSpeed();
        const stopInter = setInterval(() => {
            if (robot.x === _robotStartPosX) {
                clearInterval(stopInter);
                ballDisplayed && react.moveBall.hide();
            }
            _curRobotPosX += _speed;
            act.moveRobot(_curRobotPosX);
            ballDisplayed && react.moveBall(_curRobotPosX);
        }, 5);
    };

    const setSpeed = () => {
        robot.X > _robotStartPosX ? _speed = Math.abs(_speed) * -1 : _speed = Math.abs(_speed);
        _speed /= Math.abs(_speed);
    };
};
const randSign = () => {
    const items = [-1, 1];
    return items[Math.floor(Math.random() * items.length)];
};


