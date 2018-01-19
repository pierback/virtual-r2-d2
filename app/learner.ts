import { State, Condition, HashTable } from './states';
//@ts-ignore
import { log } from './public/scripts/helper.js';

export class Learner {
    private eps: number = 0.1;
    private lamda: number = 0.1;
    private epsDecayRate: number = 1;
    private gamma: number = 1;
    private learnRate: number = 0.3;
    private batchSize: number = 100;
    private qTable: number;
    private actions: string[];
    private stateTable: HashTable;

    constructor(actions: string[], stateTable: HashTable) {
        this.actions = actions;
        this.stateTable = stateTable;

        this.qTable = [this.actions.length][Object.keys(this.stateTable.hashes).length];
    }

    updateTable(curState: State, reward: number, prevAction: String) {
        this.eps = 0.5;
        return null;
    }

    getNextAction(curState: Condition): string {
        return this.actions[3];
    }
}
