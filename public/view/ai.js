const { parseJSON, stringifyJSON, log } = require('/scripts/helper.js');

class AI {
    constructor(controller) {
        this.controller = controller;
        this._initializeSocket();
    }
}
exports.AI = AI;
