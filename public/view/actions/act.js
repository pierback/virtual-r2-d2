class Act {
    constructor(robot, env) {
        this.env = env;
        this.robot = robot;
    }

    circle() {
        log('circle');
        const robot = new Item(this.env.robot);
        robot.Animation = 'moveCircle 0.9s 3';

        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                robot.resetAnimation();
                resolve();
            }, 3000);
        });
    }

    malfunction() {
        log('malfunction');
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
        log('moveRobot');
        this.robot.X = rbPosX;
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

    //3 seconds
    peepMonoton() {
        log('peepMonoton');
        let center = new Item(this.env.dotCenter);
        let right = new Item(this.env.dotRight);
        center.Animation = 'peepMonoton 1s 3';
        right.Animation = 'peepMonoton1 1s 0.5s 2';
        let sound = new Audio('res/Bleep.mp3');
        const trackLength = 500;
        let playthroughs = 6; //play through the file 3 times
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

    smearMake() {
        log('smearMake');
        const robot = new Item(this.env.robot);
        const smear = new Item(this.env.smearItem);
        smear.hide();
        robot.Animation = 'smearMake 1.5s 1';

        setTimeout(() => {
            const sound = new Audio('res/Splash.mp3');
            sound.play();
        }, 530);

        setTimeout(() => {
            smear.show();
            smear.X = this.robot.MaxX / 2;
            smear.Y = this.robot.Y + this.robot.Height * 0.75;
        }, 700);

        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                robot.resetAnimation();
                resolve();
            }, 2000);
        });
    }

    smearRemove() {
        log('smearRemove');
        const robot = new Item(this.env.robot);
        const smear = new Item(this.env.smearItem);
        smear.X = this.robot.MaxX / 2;
        smear.Y = this.robot.Y + this.robot.Height * 0.75;
        smear.show();
        robot.Animation = 'smearRemove 1.5s 1';


        setTimeout(() => {
            smear.hide(0.5);
        }, 600);

        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve();
                [smear, robot].map((el) => el.resetAnimation());
            }, 3000);
        });
    }

    sleep() {
        log('sleep');
        const bubble = new Item(this.env.speachBubble);
        bubble.X = this.robot.X + this.robot.Width - 40;
        bubble.Y = this.robot.Y - 10 - this.robot.Height / 2;
        bubble.Text = '💤';
        bubble.show(1);
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                bubble.hide(1);
                resolve();
            }, 4000);
        });
    }

    //3 seconds
    waveArms() {
        //[name duration iterations]
        log('waveArms');
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
}
exports.Act = Act;