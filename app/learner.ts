import { State, Condition, HashTable } from './states';
//@ts-ignore
import { log, parseJSON, createMatrix } from './public/scripts/helper.js';

export class Learner {
    private eps: number = 0.1;
    private lamda: number = 0.1;
    private epsDecayRate: number = 1;
    private gamma: number = 1;
    private learnRate: number = 0.3;
    private batchSize: number = 100;
    private qTable: number[][]; //number;
    private actions: string[];
    private stateTable: HashTable;

    constructor(actions: string[], stateTable: HashTable) {
        this.actions = actions;
        this.stateTable = stateTable;

        //this.qTable = [[this.actions.length], [Object.keys(this.stateTable.hashes).length]];

        this.qTable = createMatrix(this.actions.length, Object.keys(this.stateTable.hashes).length, 0);

        //log('value', this.qTable[0][0]); return;
        for (let i = 0; i < this.actions.length; i++) {
            for (let j = 0; j < Object.keys(this.stateTable.hashes).length; j++) {
                this.qTable[i][j] = (0 + i);
            }
        }
        //log(this.stateTable);
    }

    updateTable(curState: State, reward: number, prevAction: string) {
        const actionID = this.actions.indexOf(prevAction);
        const stateID = this.stateTable.get(JSON.stringify(curState));
        //log(prevAction, actionID, JSON.stringify(curState), stateID);
        //log(this.qTable[actionID][stateID]);
        return null;
    }

    getNextAction(curState: State): string {
        return this.actions[3];
    }
}