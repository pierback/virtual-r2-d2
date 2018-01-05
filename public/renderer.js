//@ts-check
const ws = new WebSocket('ws://localhost:4000');
ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected');
}

ws.onmessage = function (ev) {
    let test = safelyParseJSON(ev.data);
    console.log(test);
    test.print = 'new';
    setTimeout(() => {
        ws.send(JSON.stringify(test));
    }, 3000);
}

const safelyParseJSON = (res) => {
    let parsed;
    try {
        parsed = JSON.parse(res);
    } catch (e) {
        parsed = 'null';
    }
    return parsed;
}