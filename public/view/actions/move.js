//@ts-checkts
const { moveR2 } = require('./act.js');
const { moveBall, hideBall } = require('./react.js');


export function move(ballDisplayed = false, env, robot) {
    //let _interval;
    let _end = false;
    let _touchedEdges = 0;
    let _speed = 4 * randSign();
    let _curRobotPosX = robot.getPosX() + 1;
    const _robotStartPosX = robot.x;

    const _interval = setInterval(() => {
        if (_end && Math.abs(robot.getPosX() - robot.x) <= 15) {
            stop();
        }
        if (_curRobotPosX <= robot.leftBorder || _curRobotPosX >= (robot.rightBorder - 450)) {
            _speed = -_speed;
            _touchedEdges++;
            if (_touchedEdges == 2) _end = true;
        }
        _curRobotPosX += _speed;
        moveR2(_curRobotPosX);
        ballDisplayed && moveBall(_curRobotPosX);
    }, 5);


    const stop = () => {
        console.log('stop');
        clearInterval(_interval);
        robot.x > _robotStartPosX ? _speed = Math.abs(_speed) * -1 : _speed = Math.abs(_speed);
        _speed /= Math.abs(_speed);
        const stopInter = setInterval(() => {
            if (robot.x === _robotStartPosX) {
                clearInterval(stopInter);
                hideBall();
            }
            _curRobotPosX += _speed;
            moveR2(_curRobotPosX);
            ballDisplayed && moveBall(_curRobotPosX);
        });
    };
}

const randSign = () => {
    console.log('randSign');
    const items = [-1, 1];
    return items[Math.floor(Math.random() * items.length)];
};