import { State, HashTable } from './states';
//@ts-ignore
import { log, parseJSON, createMatrix } from './public/scripts/helper.js';

export class Learner {
    private eps: number = 0.1;
    private lambda: number = 0.1;
    //private epsDecayRate: number = 1;
    private gamma: number = 1;
    private learnRate: number = 0.3;
    //private batchSize: number = 100;
    private qTable: number[][]; //number;
    private eTable: number[][]; //number;
    private actions: string[];
    private stateTable: HashTable;

    constructor(actions: string[], stateTable: HashTable) {
        this.actions = actions;
        this.stateTable = stateTable;
        this.init();
    }

    get QTable() {
        return this.qTable;
    }

    private init() {
        this.qTable = createMatrix(Object.keys(this.stateTable.hashes).length, this.actions.length, 0);
        this.eTable = createMatrix(Object.keys(this.stateTable.hashes).length, this.actions.length, 0);

        //log('value', this.qTable[0][0]); return;
        for (let s = 0; s < Object.keys(this.stateTable.hashes).length; s++) {
            for (let a = 0; a < this.actions.length; a++) {
                this.qTable[s][a] = 0;
                this.eTable[s][a] = 0;
            }
        }

        this.qTable[this.stateTable.get(new State(true,  true, true))][this.actions.indexOf('sleep')] = 10;
        this.qTable[this.stateTable.get(new State(false,  true, true))][this.actions.indexOf('smearMake')] = 10;
        this.qTable[this.stateTable.get(new State(true,  false, true))][this.actions.indexOf('waveArms')] = 10;
        this.qTable[this.stateTable.get(new State(true,  true, false))][this.actions.indexOf('malfunction')] = 10;

        this.qTable[this.stateTable.get(new State(true,  false, false))][this.actions.indexOf('malfunction')] = 10;
        this.qTable[this.stateTable.get(new State(false,  false, false))][this.actions.indexOf('malfunction')] = 10;
        this.qTable[this.stateTable.get(new State(false,  true, false))][this.actions.indexOf('malfunction')] = 10;
        this.qTable[this.stateTable.get(new State(false,  true, true))][this.actions.indexOf('waveArms')] = 10;
        this.qTable[this.stateTable.get(new State(false,  true, true))][this.actions.indexOf('smearMake')] = 10;
    }

    public updateLearner(reward: number, _a1: string, _s1: State, _a2: string, _s2: State) {
        const s1 = this.stateTable.get(_s1);
        const s2 = this.stateTable.get(_s2);
        const aId1 = this.actions.indexOf(_a1);
        const aId2 = this.actions.indexOf(_a2);
        const delta = reward + this.gamma * this.qTable[s2][aId2] - this.qTable[s1][aId1];
        //log('delta', delta);
        this.eTable[s1][aId1] += 1;

        this.updateQTable(delta);
        this.updateETable();
    }

    public getNextAction(curState: State): string {
        const s = this.stateTable.get(curState);
        var maxVal: number = 0;
        let actionId: number = 0;

        if (Math.random() < this.eps) {
            //log('---pick random action');
            //choose random action
            return this.actions[Math.floor(Math.random() * this.actions.length)];
        } else {
            //choose best action
            //log('---pick best action');

            for (let a = 0; a < this.actions.length; a++) {
                if (this.qTable[s][a] >= maxVal) {
                    maxVal = this.qTable[s][a];
                    actionId = a;
                }
            }
            return this.actions[actionId];
        }
    }

    private updateQTable(delta: number) {
        for (let s = 0; s < Object.keys(this.stateTable.hashes).length; s++) {
            for (let a = 0; a < this.actions.length; a++) {
                this.qTable[s][a] = Math.round(this.qTable[s][a] + this.learnRate * delta * this.eTable[s][a]);
            }
        }
    }

    private updateETable() {
        for (let s = 0; s < Object.keys(this.stateTable.hashes).length; s++) {
            for (let a = 0; a < this.actions.length; a++) {
                this.eTable[s][a] = this.eTable[s][a] * this.lambda * this.gamma;
            }
        }
    }

}