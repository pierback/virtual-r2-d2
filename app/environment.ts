import {State, Condition, HashTable} from './states';
//@ts-ignore
import {log} from './public/scripts/helper.js';

export class Environment {
    protected energy: number = 100;
    protected attention: number = 100;
    private thresholdAttention: number = 30;
    protected oilLevel: number = 80;
    private thresholdOil: number = 40;
    protected love: number = 50;
    protected operates: boolean = true; //malfunction was very often misleading..
    protected mode: string = 'easy';

    constructor(_mode: string) {
        this.mode = _mode;
    }

    getConditionArray(): Condition {
        if (this.mode === 'easy') {
            return {
                attention: this.attention,
                oilLevel: this.oilLevel,
                operates: this.operates
            };
        } else {
            return {
                energy: this.energy,
                attention: this.attention,
                oilLevel: this.oilLevel,
                love: this.love,
                operates: this.operates
            };
        }
    }

    getDetailedState(): string {
        return `oilLevel: ${this.oilLevel}, attention: ${this.attention}, operates ${this.operates}`;
    }

    getCurrentState(): State {
        // tslint:disable-next-line:max-line-length
        return new State(this.oilLevel > this.thresholdOil ? true : false, this.attention > this.thresholdAttention ? true : false, this.operates, true, true);
    }

    getStates(): HashTable {
        let table = new HashTable();
        if (this.mode === 'easy') {
            const oil = [true, true, true, true, false, false, false, false];
            const attention = [true, true, false, false, true, true, false, false];
            const operates = [true, false, false, true, true, false, false, true];

            for (let i = 0; i < oil.length; i++) {
                let state = new State(oil[i], attention[i], operates[i]);
                table.put(state, i);
            }
        }
        return table;
    }

    //UPDATE ENVIRONMENT STATE
    update(action: string, reaction: string) {
        //log(action, reaction);
        this._updateOperates(action, reaction);
        this._updateAttention(action, reaction);

        if (this.mode === 'easy') {
            this._updateOilEasy(action, reaction);
        } else if (this.mode === 'hard') {
            this._updateOilLevel(action, reaction);
            this._updateEnergy(action, reaction);
            this._updateLove(action, reaction);
        }
    }

    _updateOperates(_action: string, reaction: string) {
        if (reaction === 'repair') {
            this.operates = true;
        } else {
            if (Math.random() < 0.1) {
                this.operates = false;
            }
        }
    }

    _updateOilEasy(action: string, reaction: string) {
        if (reaction == 'charge') reaction = 'oil';
        this._updateOilLevel(action, reaction);
    }

    _updateOilLevel(action: string, reaction: string) {
        if (action === 'smearMake') {
            this.oilLevel -= 20;
        } else if (action === 'waveArms') {
            //log('decrease oil');
            this.oilLevel -= 15;
        }
        if (reaction === 'oil' && this.oilLevel <= this.thresholdOil && this.operates) {
            //log('increase oil');
            this.oilLevel += 60;
        }
    }

    _updateEnergy(action: string, reaction: string) {
        if (action !== 'sleep') {
            this.energy -= 5;
        }
        if (reaction === 'charge' && this.operates) {
            this.energy = 100;
        }
    }

    _updateAttention(_action: string, reaction: string) {
        //log('tmpReaction attention', reaction);
        if (reaction === 'noreaction') {
            const decrease = 8 * Math.pow(this.attention / 100, 2) + 5;
            this.attention = this.attention - Math.floor(decrease);
            //log('decrease attention');
        } else if (['playball', 'praise'].includes(reaction) && this.operates) {
            //log('increase attention');
            this.attention += 10;
        }

        if (this.attention > 100) this.attention = 100;
    }

    _updateLove(_action: string, reaction: string) {
        if (reaction === 'praise' && this.operates) {
            this.love += 50;
        } else {
            this.love -= 5;
        }

        if (this.love > 100) this.love = 100;
    }

    //GET REWARD
    getReward(reaction: string, prevConditions: any) {
        let reward: number = 0;

        reward = this.getRewardNoReaction(reward, reaction, prevConditions);
        reward = this.getRewardOperates(reward, reaction, prevConditions);

        if (this.mode === 'easy') {
            reward = this.getRewardOilEasy(reward, reaction, prevConditions);
            reward = this.getRewardAttentionEasy(reward, reaction, prevConditions);
        } else if (this.mode === 'hard') {
            reward = this.getRewardCharge(reward, reaction, prevConditions);
            reward = this.getRewardOil(reward, reaction, prevConditions);
            reward = this.getRewardAttention(reward, reaction, prevConditions);
            reward = this.getRewardLove(reward, reaction, prevConditions);
        }

        return reward;
    }

    private getRewardNoReaction(reward: number, reaction: string, prevConditions: Condition){
        if (reaction === 'noreaction') {
            //easy mode is valid, because the value for energy and love is not changed
            let love: boolean = true;
            let energy: boolean = true;
            if (this.mode === 'hard') {
                //@ts-ignore
                love = prevConditions.love >= 50 ? true : false;
                //@ts-ignore
                energy = prevConditions.energy > 70 ? true : false;
            }
            const oil = prevConditions.oilLevel > this.thresholdOil ? true : false;
            const attention = prevConditions.attention > this.thresholdAttention ? true : false;
            const operates = prevConditions.operates ? true : false;

            if (love && oil && attention && energy && operates) {
                reward += 32;
            } else {
                reward -= 32;
            }
        }

        return reward;
    }

    private getRewardOperates(reward: number, reaction: string, prevConditions: Condition) {
        if (reaction === 'repair') {
            //repaired robo
            if (!prevConditions.operates) {
                reward += 51;
            } else {
                reward -= 51;
            }
        }
        return reward;
    }

    private getRewardOilEasy(reward: number, reaction: string, prevConditions: Condition) {
        if (reaction === 'oil' || reaction === 'charge') {
            reward = this.getRewardOil(reward, 'oil', prevConditions);
        }
        return reward;
    }

    private getRewardOil(reward: number, reaction: string, prevConditions: Condition) {
        if (reaction === 'oil') {
            if (prevConditions.oilLevel > this.thresholdOil) {
                reward -= 30;
            } else {
                reward += 30;
            }
        }
        return reward;
    }

    private getRewardCharge(reward: number, reaction: string, prevConditions: Condition) {
        if (reaction === 'charge') {
            //@ts-ignore
            if (prevConditions.energy < 50) {
                reward += 30;
                //@ts-ignore
            } else if (prevConditions.energy < 80) {
                reward += 10;
            } else {
                reward += -30;
            }
        }
        return reward;
    }



    private getRewardAttentionEasy(reward: number, reaction: string, prevConditions: Condition) {
        if (['playball', 'praise'].includes(reaction)) {
            reward = this.getRewardAttention(reward, 'playball', prevConditions);
        }
        return reward;
    }

    private getRewardAttention(reward: number, reaction: string, prevConditions: Condition) {
        if (reaction === 'playball') {
            if (prevConditions.attention < this.thresholdAttention) {
                reward += 31;
            } else {
                reward -= 31;
            }
        }

        return reward;
    }

    private getRewardLove(reward: number, reaction: string, prevConditions: Condition) {
        if (reaction === 'praise') {
            //@ts-ignore
            if (prevConditions.love < 50) {
                reward += 30;
            } else {
                reward -= 30;
            }
        }

        if (reaction === 'punish') {
            reward -= 30;
        }
        return reward;
    }


}