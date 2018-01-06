const { parseJSON, stringifyJSON, Log } = require('/scripts/helper.js');
//TODO: require bower_modules in rederer.js not in index.html
/* const { CanvasTextWrapper } = require('/scripts/canvas-text-wrapper.js'); */
const ws = new WebSocket('ws://localhost:4000');
ws.onopen = function () {
    Log('websocket is connected ...');
    const test = { port: 4000, print: 'test test' };
    ws.send(stringifyJSON(test));
};
ws.onmessage = function (ev) {
    const test = parseJSON(ev.data);
    test.print = 'new';
    setTimeout(() => {
        Log(test);
        // ws.send(stringifyJSON(test));
    }, 3000);
};

/* const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const text = 'Beep bop boop beep beep beep!';
context.font = '45pt Calibri';
 */
//CanvasTextWrapper(canvas, text, { font: context.font, textAlign: 'center', lineBreak: 'auto', allowNewLine: true });
const elem = document.getElementById('r2d2-wrapper');
elem.style.left = (window.screen.width / 2) - 100;
elem.style.top = (window.screen.height / 5);
setTimeout(() => myMove(), 2000);

function myMove() {
    const start = parseInt(elem.style.left);
    let pos = start + 1;
    let end = false;
    let speed = 4;
    const id = setInterval(() => {
        if (end && Math.abs(parseInt(elem.style.left) - start) <= 5) {
            clearInterval(id);
        }
        if (pos <= 150 || pos >= (window.screen.width - 450)) {
            speed = -speed;
            if (pos <= 150) end = true;
        }
        pos += speed;
        elem.style.left = pos + 'px';
    }, 5);
}

/* let x = 0;
const y = 15;
let speed = 0.3;
speed = 0.3;
function animate() {
    requestAnimationFrame(animate);
    x += speed;
    if (x <= 0 || x >= 475) {
        speed = -speed;
        // y = y + 10; so könnte das Objekt am Ende einer Zeile eine Zeile nach unten gehen
    }
    draw();
}

function draw() {
    Log('draw');
    context.clearRect(0, 0, 500, 300);
    context.fillStyle = '#dfac20';
    context.fillRect(x, y, 20, 20);
    context.lineWidth = 3;
    context.strokeStyle = '#3983ab';
    context.strokeRect(x, y, 20, 20);
}
document.addEventListener('DOMContentLoaded', function () {
    animate();
}); */