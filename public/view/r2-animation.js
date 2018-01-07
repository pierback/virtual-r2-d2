//@ts-check
const { log } = require('/scripts/helper.js');
const r2 = document.getElementById('r2d2-wrapper');
const btn = document.getElementById('stop-btn');
const ball = document.getElementById('ball');
const ballBtn = document.getElementById('ball-btn');
const offsets = r2.getBoundingClientRect();
const r2PosX = () => parseInt(r2.style.left);
const r2PosY = () => parseInt(r2.style.top);
const startPosX = parseInt(offsets.left);
const startPosY = parseInt(offsets.top);
const endAnimation = false;
let interval, speed;
let blockClick = false;
let ballDisp = false;
setR2Position();
setBallPos();

r2.addEventListener('click', () => {
    !blockClick && move();
});
ballBtn.addEventListener('click', () => {
    if (!blockClick) {
        ballDisp = true;
        move();
    }
});
btn.addEventListener('click', stop);



function setBallPos() {
    ball.style.left = startPosX + 18 + 200 + 'px';
    ball.style.top = startPosY + 175 + 'px';
}

function moveBall(dir) {
    ball.style.display = 'inline';
    ballBtn.disabled = true;
    let direction;
    dir < 0 ? direction = 200 : direction = -75;
    ball.style.left = r2PosX() + 18 + (direction) + 'px';
    ball.style.top = r2PosY() + 175 + 'px';
}

function switchSide() {
    ball.style.left = r2PosX() + 75 + 'px';
    ball.style.top = r2PosY() - 175 + 'px';
}

function move(ev, dir = 1) {
    if (!blockClick) {
        blockClick = true;
        let pos = startPosX + 1;
        let end = false;
        let touchedEdges = 0;
        speed = 4 * dir;
        interval = setInterval(() => {
            if (end && Math.abs(r2PosX() - startPosX) <= 15) {
                blockClick = false;
                stop();
            }
            if (pos <= 150 || pos >= (window.screen.width - 450)) {
                speed = -speed;
                touchedEdges++;
                if (touchedEdges == 4) end = true;
            }
            pos += speed;
            r2.style.left = pos + 'px';
            ballDisp && moveBall(-speed);
        }, 5);
    }
}

function setR2Position() {
    r2.style.left = startPosX;
}

function stop() {
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

function hideBall() {
    ballDisp = false;
    ball.style.display = 'none';
    ballBtn.disabled = false;
}


function randSign() {
    const items = [-1, 1];
    return items[Math.floor(Math.random() * items.length)];
}

