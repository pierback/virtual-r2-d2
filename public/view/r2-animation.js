const r2 = document.getElementById('r2d2-wrapper');
const btn = document.getElementById('stop-btn');
let endAnimation = false;
let interval;

r2.addEventListener('click', move);
btn.addEventListener('click', stop);

setPosition();

function move(ev, dir = 1) {
    btn.style.display = 'flex';
    const start = parseInt(r2.style.left);
    let pos = start + 1;
    let end = false;
    let speed = 4 * dir;
    let touchedEdges = 0;
    setTimeout(() => endAnimation = true, 20000);
    interval = setInterval(() => {
        if (end && Math.abs(parseInt(r2.style.left) - start) <= 5) {
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
    btn.style.display = 'none';
    setPosition();
}

function randSign() {
    const items = [-1, 1];
    return items[Math.floor(Math.random() * items.length)];
}