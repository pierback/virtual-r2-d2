//@ts-check
const { log } = require('/scripts/helper.js');
const r2 = document.getElementById('r2d2-wrapper');
const btn = document.getElementById('stop-btn');
const startPosX = (window.screen.width / 2) - 100;
let endAnimation = false;
let interval, speed;

r2.addEventListener('click', move);
btn.addEventListener('click', stop);

setPosition();

function move(ev, dir = 1) {
    btn.style.display = 'flex';
    const start = parseInt(startPosX);
    let pos = start + 1;
    let end = false;
    let touchedEdges = 0;
    speed = 4 * dir;
    setTimeout(() => endAnimation = true, 20000);
    interval = setInterval(() => {
        if (end && Math.abs(r2PosX() - start) <= 5) {
            stop();
            setPosition();
            !endAnimation && setTimeout(() => move(randSign), 1000);
        }
        if (pos <= 150 || pos >= (window.screen.width - 450)) {
            speed = -speed;
            touchedEdges++;
            if (touchedEdges == 2) end = true;
        }
        pos += speed;
        r2.style.left = pos + 'px';
    }, 5);
}

function setPosition() {
    r2.style.left = (window.screen.width / 2) - 100;
    r2.style.top = (window.screen.height / 5);
}

function stop() {
    clearInterval(interval);
    btn.disabled = true;
    let curPos = r2PosX();
    r2PosX() > startPosX ? speed = Math.abs(speed) * -1 : speed = Math.abs(speed);

    const stopInter = setInterval(() => {
        if (Math.abs(r2PosX() - parseInt(startPosX)) <= 15) {
            speed /= Math.abs(speed);
        }
        if (r2PosX() === (window.screen.width / 2) - 100) {
            clearInterval(stopInter);
            btn.style.display = 'none';
            btn.disabled = false;
        }
        curPos += speed;
        r2.style.left = curPos + 'px';
    });
}

function randSign() {
    const items = [-1, 1];
    return items[Math.floor(Math.random() * items.length)];
}

const r2PosX = () => parseInt(r2.style.left);