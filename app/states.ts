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
  private oil: boolean;
  private attention: boolean;
  private malfunction: boolean;
  private energy: boolean = true;
  private love: boolean = true;

  constructor(_oil: boolean, _attention: boolean, _malfunction: boolean, _energy?: boolean, _love?: boolean) {
    this.oil = _oil;
    this.attention = _attention;
    this.malfunction = _malfunction;
    this.energy = _energy || true;
    this.love = _love || true;
  }
}

export class HashTable {
  public hashes: Object = {};

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
