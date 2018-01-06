const { parseJSON, stringifyJSON } = require('../scripts/helper.js');
const ws = new WebSocket('ws://localhost:4000');
ws.onopen = function () {
    console.log('websocket is connected ...');
    const test = { port: 4000, print: 'test test' };
    ws.send(JSON.stringify(test));
};
ws.onmessage = function (ev) {
    const test = parseJSON(ev.data);
    test.print = 'new';
    setTimeout(() => {
        console.log(test);
        ws.send(stringifyJSON(test));
    }, 3000);
};

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const maxWidth = 400;
const lineHeight = 60;
const x = (canvas.width - 340) / 2;
const y = 70;
const text = 'Beep bop boop beep beep beep!';

context.font = '16pt Calibri';
context.fillStyle = '#333';

context.font = '40pt Calibri';
context.fillStyle = '#82acdb';
wrapText(context, text, x, y, maxWidth, lineHeight);
