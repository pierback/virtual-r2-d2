

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