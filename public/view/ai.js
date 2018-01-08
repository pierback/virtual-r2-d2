const { parseJSON, stringifyJSON, log } = require('/scripts/helper.js');

class AI {
    constructor(controller) {
        this.controller = controller;
        this._initializeSocket();
    }
    _initializeSocket() {
        const evalControllerFunc = this.evalControllerFunc;
        const controller = this.controller;
        const ws = new WebSocket('ws://localhost:4000');
        ws.onopen = function () {
            log('websocket is connected ...');
        };
        ws.onmessage = function (ev) {
            const funcStr = ev.data.toString();
            evalControllerFunc(controller, funcStr);
        };
    }

    evalControllerFunc(controller, funcStr) {
        if (funcStr === 'move') {
            controller.move();
        }
    }
}
exports.AI = AI;
