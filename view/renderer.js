const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// do cool things with the context
context.font = '40pt Calibri';
context.fillStyle = 'blue';
context.fillText('Hello World!', 150, 100);

const ws = new WebSocket('ws://localhost:4000');
ws.onopen = function () {
    console.log('websocket is connected ...');
    const test = { port: 4000, print: 'test test' };
    ws.send(JSON.stringify(test));
};
ws.onmessage = function (ev) {
    const test = safelyParseJSON(ev.data);
    test.print = 'new';
    setTimeout(() => {
        console.log(test);
        ws.send(JSON.stringify(test));
    }, 3000);
};

const safelyParseJSON = (res) => {
    let parsed;
    try {
        parsed = JSON.parse(res);
    } catch (e) {
        parsed = 'null';
    }
    return parsed;
};