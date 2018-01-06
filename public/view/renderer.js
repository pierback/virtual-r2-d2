const { parseJSON, stringifyJSON, Log } = require('/scripts/helper.js');
//TODO: require bower_modules in rederer.js not in index.html
//const { CanvasTextWrapper } = require('/scripts/canvas-text-wrapper.js');


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
        ws.send(stringifyJSON(test));
    }, 3000);
};

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const maxWidth = 400;
const lineHeight = 60;
const x = (canvas.width - 340) / 2;
const y = 70;
const text = 'Beep bop boop beep beep beep!';

context.font = '16pt Calibri';
context.fillStyle = '#333';

context.font = '45pt Calibri';
context.fillStyle = '#82acdb';

CanvasTextWrapper(canvas, text, { font: context.font, textAlign: 'center', lineBreak: 'auto', allowNewLine: true });
//wrapText(context, text, x, y, maxWidth, lineHeight);
