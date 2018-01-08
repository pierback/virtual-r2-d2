//@ts-check
const { randSign } = require('../../scripts/helper.js');

exports.Move = (robot, act, react, ballDisplayed = false) => {
    const direction = randSign();
    let _curRobotPosX = robot.StartX + 1;
    let _speed = 4 * direction;
    let _touchedEdges = 0;

    const _moveInterval = setInterval(() => {
        if (inStartPosRange()) {
            stop();
        }
        if (robotOutOfRange()) {
            _speed = -_speed;
            _touchedEdges++;
        }
        _curRobotPosX += _speed;
        act.moveRobot(_curRobotPosX);
        moveBall();
    }, 5);

    const stop = () => {
        setSpeed();
        clearInterval(_moveInterval);
        const stopInterval = setInterval(() => {
            if (backOnStartPos()) {
                clearInterval(stopInterval);
                hideBall();
            } else {
                _curRobotPosX += _speed;
                act.moveRobot(_curRobotPosX);
                moveBall();
            }
        }, 5);
    };

    //_moveInterval()
    const offset = 50;
    const ballWidth = ballDisplayed ? 40 + offset : 0;//get ballWidth from item.js + offset
    const robotOutOfRange = () => (_curRobotPosX <= (robot.MinX + ballWidth) || _curRobotPosX >= (robot.MaxX - ballWidth));
    const inStartPosRange = () => _touchedEdges == 2 && Math.abs(robot.X - robot.StartX) <= 10;
    //stop()
    const backOnStartPos = () => Math.floor(robot.X) === Math.floor(robot.StartX);
    //determine in which direction is startPos
    const setSpeed = () => robot.X > robot.StartX ? _speed = -1 : _speed = 1;
    //ball function wrappers
    const initBallItem = () => ballDisplayed && react.playBall(direction);
    const moveBall = () => ballDisplayed && react.playBall.moveBall(_speed);
    const hideBall = () => ballDisplayed && react.playBall.hide();
    initBallItem();
};


