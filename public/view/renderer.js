require('./view/r2-animation.js');
const { parseJSON, stringifyJSON, log } = require('/scripts/helper.js');
//TODO: require bower_modules in rederer.js not in index.html
/* const { CanvasTextWrapper } = require('/scripts/canvas-text-wrapper.js'); */
const ws = new WebSocket('ws://localhost:4000');
ws.onopen = function () {
    log('websocket is connected ...');
    const test = { port: 4000, print: 'test test' };
    ws.send(stringifyJSON(test));
};
ws.onmessage = function (ev) {
    const test = parseJSON(ev.data);
    test.print = 'new';
    setTimeout(() => {
        log(test);
        // ws.send(stringifyJSON(test));
    }, 3000);
};