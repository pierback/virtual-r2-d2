class Act {
    constructor(robot, env) {
        this.env = env;
        this.robot = robot;
    }

    malfunction() {
        const bubble = new Item(this.env.speachBubble);
        bubble.Text = '⚡️ 💨';
        bubble.show(1);
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                bubble.hide(1);
                resolve();
            }, 3500);
        });
    }

    moveRobot(rbPosX) {
        this.robot.X = rbPosX;
    }

    circle() {
        const robot = new Item(this.env.robot);
        robot.Animation = 'moveCircle 3s 1';
        return new Promise(function (resolve, reject) {
            log('circle');
            setTimeout(() => resolve(), 3000);
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
            setTimeout(() => {
                resolve();
                [left, right].map((el) => el.resetAnimation());
            }, 3000);
        });
    }

    //3 seconds
    peepMonoton() {
        let center = new Item(this.env.dotCenter);
        let right = new Item(this.env.dotRight);
        center.Animation = 'peepMonoton 1s 3';
        right.Animation = 'peepMonoton1 1s 0.5s 2';
        let sound = new Audio('res/Bleep.mp3');
        const trackLength = 500;
        let playthroughs = 6; //play through the file 3 times

        log('peepMonoton');
        return new Promise(function (resolve, reject) {
            const player = setInterval(function () {
                if (playthroughs > 0) {
                    sound.play();
                    playthroughs--;
                }
                else {
                    resolve();
                    clearInterval(player);
                    [center, right].map((el) => el.resetAnimation());
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
        const trackLength = 1000;
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
                    [leftUp, leftDown, robot].map((el) => el.resetAnimation());
                }
            }, trackLength);
        });
    }
}
exports.Act = Act;