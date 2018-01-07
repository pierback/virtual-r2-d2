//@ts-checkts
const { moveR2 } = require('./act.js');
const { moveBall } = require('./react.js');
let interval, speed;
let end = false;
const ballDisp = false;

function move(ballDisplayed = false, env, r2d2) {
    let pos = r2d2.getPosX() + 1;
    let touchedEdges = 0;
    speed = 4 * randSign();
    interval = setInterval(() => {
        if (end && Math.abs(r2d2.getPosX() - r2d2.startPosX()) <= 15) {
            stop();
        }
        if (pos <= env.canvasOffset.left || pos >= (env.canvasOffset.right - 450)) {
            speed = -speed;
            touchedEdges++;
            if (touchedEdges == 2) end = true;
        }
        pos += speed;
        moveR2(pos);
        ballDisplayed && moveBall(pos);
    }, 5);
}
module.exports = move;


function stop() {
    console.log('stop');
    clearInterval(interval);
    let curPos = r2PosX();
    r2PosX() > startPosX ? speed = Math.abs(speed) * -1 : speed = Math.abs(speed);

    const stopInter = setInterval(() => {
        if (Math.abs(r2PosX() - startPosX) <= 5) {
            speed /= Math.abs(speed);
        }
        if (r2PosX() === startPosX) {
            clearInterval(stopInter);
            hideBall();
        }
        curPos += speed;
        r2.style.left = curPos + 'px';
        ballDisp && moveBall(speed);
    });
}

function randSign() {
    console.log('randSign');
    const items = [-1, 1];
    return items[Math.floor(Math.random() * items.length)];
}