//@ts-check
class Environment {
    constructor() {
        this.energy = 100;
        this.attention = 100;
        this.oilLevel = 100;
        this.love = 50;
        this.malfunction = false;
    }

    update(action, reaction) {
        console.log(action, reaction);
        this._updateEnergy(action, reaction);
        this._updateAttention(action, reaction);
        this._updateOilLevel(action, reaction);
        this._updateLove(action, reaction);
        this._updateMalfunction(action, reaction);
    }

    get conditionArray() {
        return {
            energy: this.energy,
            attention: this.attention,
            oilLevel: this.oilLevel,
            love: this.love,
            malfunction: this.malfunction
        };
    }

    _updateEnergy(action, reaction) {
        if (action !== 'sleep') {
            this.energy -= 5;
        }
        if (reaction === 'charge' && !this.malfunction) {
            this.energy = 100;
        }
    }

    _updateAttention(action, reaction) {
        if (reaction === 'noreaction') {
            const decrease = (8 * (Math.pow((this.attention / 100), 2)) + 5);
            this.attention = this.attention - Math.floor(decrease);
        } else if (['playBall', 'smearMake'].includes(reaction) && !this.malfunction) {
            this.attention += 10;
        } else if (!this.malfunction) {
            this.attention += 5;
        }

        if (this.attention > 100)
            this.attention = 100;
    }

    _updateOilLevel(action, reaction) {
        if (action === 'smearMake') {
            this.oilLevel -= 15;
        } else if (action === 'waveArms') {
            this.oilLevel -= 5;
        }
        if (reaction === 'oil' && this.oilLevel < 40 && !this.malfunction) {
            this.oilLevel += 60;
        }
    }

    _updateLove(action, reaction) {
        if (reaction === 'praise' && !this.malfunction) {
            this.love += 50;
        } else {
            this.love -= 5;
        }

        if (this.love > 100)
            this.love = 100;
    }

    _updateMalfunction(action, reaction) {
        if (reaction === 'repair') {
            this.malfunction = false;
        } else {
            if (Math.random() < 0.05) {
                this.malfunction = true;
            }
        }
    }

    getReward(reaction, prevConditions) {
        let reward = 0;
        if (reaction === 'charge') {
            if (prevConditions.energy < 50) {
                reward += 50;
            } else if (prevConditions.energy < 80) {
                reward += 10;
            } else {
                reward += -10;
            }
        }
        if (reaction === 'oil') {
            if (prevConditions.oilLevel > 40) {
                reward -= 50;
            } else {
                reward += 50;
            }
        }

        if (reaction === 'playBall') {
            if (prevConditions.attention < 80) {
                reward += 5;
            } else {
                reward += 0;
            }
        }

        if (reaction === 'praise') {
            if (prevConditions.love < 50) {
                reward += 25;
            } else {
                reward -= 10;
            }
        }

        if (reaction === 'repair') {
            //repaired robo
            if (prevConditions.malfunction) {
                reward += 70;
            } else {
                reward -= 50;
            }
        }

        if (reaction === 'punish') {
            if (prevConditions.attention < 50) {
                reward += 10;
            }
        }

        if (reaction === 'noreaction') {
            const love = prevConditions.love > 50 ? true : false;
            const oil = prevConditions.oil > 70 ? true : false;
            const attention = prevConditions.attention > 70 ? true : false;
            const energy = prevConditions.energy > 70 ? true : false;
            const malfunction = prevConditions.malfunction ? false : true;

            if (love && oil && attention && energy && malfunction) {
                reward += 30;
            } else {
                reward -= 10;
            }
        }

        Object.entries(this.conditionArray).forEach(([key, value]) => {
            if (key !== 'malfunction') {
                if (value < 10) {
                    console.log('loop value', value, 'rewardsd', reward);
                    reward -= 10;
                } else {
                    reward += 5;
                }
            }
        });
        return reward;
    }
}
exports.Environment = Environment;