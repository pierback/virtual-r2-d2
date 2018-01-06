const elem = document.getElementById('r2d2-wrapper');
elem.style.left = (window.screen.width / 2) - 100;
elem.style.top = (window.screen.height / 5);
let endAnimation = false;

setTimeout(() => move(), 2000);
setTimeout(() => endAnimation = true, 20000);

function move(dir = 1) {
    const start = parseInt(elem.style.left);
    let pos = start + 1;
    let end = false;
    let speed = 4 * dir;
    let touchedEdges = 0;
    const id = setInterval(() => {
        if (end && Math.abs(parseInt(elem.style.left) - start) <= 5) {
            clearInterval(id);
            const items = [-1, 1];
            elem.style.left = (window.screen.width / 2) - 100;
            !endAnimation && setTimeout(() => move(items[Math.floor(Math.random() * items.length)]), 1000);
        }
        if (pos <= 150 || pos >= (window.screen.width - 450)) {
            speed = -speed;
            touchedEdges++;
            if (touchedEdges == 2) end = true;
        }
        pos += speed;
        elem.style.left = pos + 'px';
    }, 5);
}