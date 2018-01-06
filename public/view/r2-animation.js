const r2 = document.getElementById('r2d2-wrapper');
const btn = document.getElementById('stop-btn');
r2.style.left = (window.screen.width / 2) - 100;
r2.style.top = (window.screen.height / 5);
let endAnimation = false;
let interval;

r2.addEventListener('click', move);
btn.addEventListener('click', stop);

function move(ev, dir = 1) {
    btn.style.display = 'flex';
    setTimeout(() => endAnimation = true, 20000);
    const start = parseInt(r2.style.left);
    let pos = start + 1;
    let end = false;
    let speed = 4 * dir;
    let touchedEdges = 0;
    interval = setInterval(() => {
        if (end && Math.abs(parseInt(r2.style.left) - start) <= 5) {
            stop();
            const items = [-1, 1];
            r2.style.left = (window.screen.width / 2) - 100;
            !endAnimation && setTimeout(() => move(items[Math.floor(Math.random() * items.length)]), 1000);
        }
        if (pos <= 150 || pos >= (window.screen.width - 450)) {
            speed = -speed;
            touchedEdges++;
            if (touchedEdges == 2) end = true;
        }
        pos += speed;
        console.log('move', r2.style.left, dir);
        r2.style.left = pos + 'px';
    }, 5);
}

function stop() {
    clearInterval(interval);
    btn.style.display = 'none';
    r2.style.left = (window.screen.width / 2) - 100;
    r2.style.top = (window.screen.height / 5);
}