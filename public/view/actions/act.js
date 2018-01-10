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
        return new Promise(function (resolve, reject) {
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
        });
    }

    //3 seconds
    waveArms() {
        //[name duration iterations]
        let animationQuery = 'arm 1.5s 2';
        let left = new Item(this.env.legLeft);
        let right = new Item(this.env.legRight);
        left.Animation = 'arm 1.5s 2';
        right.Animation = 'arm 1.5s 2';
        return new Promise(function (resolve, reject) {
            log('waveArms');
            setTimeout(() => resolve(), 3000);
        });
    }

    //3 seconds
    peepMonoton() {
        let center = new Item(this.env.dotCenter);
        let right = new Item(this.env.dotRight);
        center.Animation = 'peepMonoton 1s 3';
        right.Animation = 'peepMonoton1 1s 0.5s 2';
        let sound = new Audio('res/Bleep.mp3');
        const trackLength = 500; // 5 seconds for instance
        let playthroughs = 6; //play through the file 3 times

        return new Promise(function (resolve, reject) {
            const player = setInterval(function () {
                log('peepMonoton');
                if (playthroughs > 0) {
                    sound.play();
                    playthroughs--;
                }
                else {
                    resolve();
                    clearInterval(player);
                }
            }, trackLength);
        });
    }

    //4 seconds
    peepIrregular() {
        log('peepIrregular');
        let leftUp = new Item(this.env.dotLeftUp);
        let leftDown = new Item(this.env.dotLeftBottom);
        let robot = new Item(this.env.robot);
        leftUp.Animation = 'peepIrregular 1s 0.9s 3';
        leftDown.Animation = 'peepIrregular 1s 1s 3';
        robot.Animation = 'shaking 1s 1s 3';
        const sound = new Audio('res/Beeping.mp3');
        const trackLength = 1000; // 5 seconds for instance
        let playthroughs = 3; //play through the file 3 times

        return new Promise(function (resolve, reject) {
            const player = setInterval(function () {
                if (playthroughs > 0) {
                    sound.play();
                    playthroughs--;
                }
                else {
                    resolve();
                    clearInterval(player);
                }
            }, trackLength);
        });
    }
}
exports.Act = Act;