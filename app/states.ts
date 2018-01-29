export class State {
  private oilLevel: boolean;
  private attention: boolean;
  private operates: boolean;
  private energy: boolean = true;
  private love: boolean = true;

  constructor(_oilLevel: boolean, _attention: boolean, _operates: boolean, _energy?: boolean, _love?: boolean) {
    this.oilLevel = _oilLevel;
    this.attention = _attention;
    this.operates = _operates;
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
  operates: boolean
};
