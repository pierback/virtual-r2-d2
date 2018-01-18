/*export enum State {
    ENERGY = ENERGY_LOW | ENERGY_HIGH,
    OIL_HIGH,
    ATTENTION_LOW,
    ATTENTION_HIGH = 1,
    MALFUNCTION_TRUE,
    MALFUNCTION_FALSE,
    LOVE_LOW,
    LOVE_HIGH,
    ENERGY_LOW,
    ENERGY_HIGH,
}*/

export class State {
  protected energy: boolean;
  protected oil: boolean;
  protected attention: boolean;
  protected love: boolean;
  protected malfunction: boolean;

  constructor(oil: boolean, attention: boolean, malfunction: boolean, energy: boolean = true, love: boolean = true) {
    this.energy = energy;
    this.oil = oil;
    this.attention = attention;
    this.love = love;
    this.malfunction = malfunction;
  }
}

export class HashTable {
  public hashes: any;

  constructor() {
    this.hashes = {};
  }

  put(key: any, value: number) {
    this.hashes[JSON.stringify(key)] = value;
  }

  get(key: any) {
    return this.hashes[JSON.stringify(key)];
  }
}

export type Condition = {
  energy?: number,
  attention: number,
  oilLevel: number,
  love?: number,
  malfunction: boolean
};
