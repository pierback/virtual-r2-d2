
const { parseJSON, stringifyJSON, log } = require('/scripts/helper.js');

const r2d2 = require('./r2-d2.js');
const act = require('./actions/act.js');
const react = require('./actions/react.js');
const env = require('./environment/env.js');
const user = require('./user.js');

//TO-DO: initialize user (only env), act, react with same object of r2-d2 and env 


/* const ws = new WebSocket('ws://localhost:4000');
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
}; */