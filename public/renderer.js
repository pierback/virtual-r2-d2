//@ts-check
const ws = new WebSocket('ws://localhost:4000');
ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected');
}

ws.onmessage = function (ev) {
    console.log('Hallo Klause');
    let test = { port: 4201, print: "test test" };

    setTimeout(() => {
        ws.send(JSON.stringify(test));
    }, 3000);
}

