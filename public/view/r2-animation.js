//@ts-check
const { log } = require('/scripts/helper.js');
const r2 = document.getElementById('r2d2-wrapper');
const btn = document.getElementById('stop-btn');
const offsets = r2.getBoundingClientRect();
const r2PosX = () => parseInt(r2.style.left);
const startPosX = parseInt(offsets.left);
let endAnimation = false;
let interval, speed;
setPosition();

r2.addEventListener('click', move);
btn.addEventListener('click', stop);

function move(ev, dir = 1) {
    btn.style.display = 'flex';
    let pos = startPosX + 1;
    let end = false;
    let touchedEdges = 0;
    speed = 4 * dir;
    setTimeout(() => endAnimation = true, 20000);
    interval = setInterval(() => {
        if (end && Math.abs(r2PosX() - startPosX) <= 5) {
            stop();
            !endAnimation && setTimeout(() => move(randSign), 1000);
        }
        if (pos <= 150 || pos >= (window.screen.width - 450)) {
            speed = -speed;
            touchedEdges++;
            if (touchedEdges == 2) end = true;
        }
        log('click', pos, speed);
        pos += speed;
        r2.style.left = pos + 'px';
    }, 5);
}

function setPosition() {
    r2.style.left = startPosX;//(window.screen.width / 2) - 100;
    //r2.style.top = (window.screen.height / 5);
}

function stop() {
    clearInterval(interval);
    btn.disabled = true;
    let curPos = r2PosX();
    r2PosX() > startPosX ? speed = Math.abs(speed) * -1 : speed = Math.abs(speed);

    const stopInter = setInterval(() => {
        if (Math.abs(r2PosX() - startPosX) <= 15) {
            speed /= Math.abs(speed);
        }
        if (r2PosX() === startPosX) {
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

