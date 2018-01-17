import { State, Condition, HashTable } from './states';

export class Learner {
    protected eps: number;
    protected lamda: number;
    protected epsDecayRate: number;
    protected gamma: number;
    protected learnRate: number;
    protected batchSize: number;
    protected qTable: number;
    protected actions: String[];
    protected stateTable: HashTable;

    constructor(actions: String[], stateTable: HashTable) {
        this.eps = 0.1;
        this.lamda = 0.1;
        this.epsDecayRate = 0.1;
        this.gamma = 0.1;
        this.learnRate = 0.1;
        this.batchSize = 0.1;
        this.actions = actions;
        this.stateTable = stateTable;

        this.qTable = [this.actions.length][Object.keys(this.stateTable.hashes).length];
    }

    updateTable(curState: State, reward: number, prevAction: String) {
        return null;
    }

    getNextAction(curState: State): string {
        return '';
    }
}
