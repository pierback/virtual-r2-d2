export class Learner {
    protected eps: number;
    protected lamda: number;
    protected epsDecayRate: number;
    protected gamma: number;
    protected learnRate: number;
    protected batchSize: number;
    //protected qTable: QTable[][][];
    constructor() {
        this.eps = 0.1;
        this.lamda = 0.1;
        this.epsDecayRate = 0.1;
        this.gamma = 0.1;
        this.learnRate = 0.1;
        this.batchSize = 0.1;
    }

    initqTable() {
        this.eps = 0.5;
    }
}