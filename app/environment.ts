import {State} from './states';

export class Environment {
    protected energy: number = 100;
    protected attention: number = 100;
    protected oilLevel: number = 100;
    protected love: number = 50;
    protected malfunction: boolean = false;
    protected mode: string;

    constructor(mode = 'easy') {
        this.mode = mode;
    }

    update(action:string, reaction:string) {
        console.log(action, reaction);
        this._updateMalfunction(action, reaction);

        if (this.mode === 'easy') {
            this._updateOilEasy(action, reaction);
            this._updateAttentionEasy(action, reaction);
        } else if (this.mode === 'hard') {
            this._updateAttention(action, reaction);
            this._updateOilLevel(action, reaction);
            this._updateEnergy(action, reaction);
            this._updateLove(action, reaction);
        }
    }

    getConditionArray() {
        if (this.mode === 'easy') {
            return {
                attention: this.attention,
                oilLevel: this.oilLevel,
                malfunction: this.malfunction
            };
        } else if (this.mode === 'hard') {
            return {
                energy: this.energy,
                attention: this.attention,
                oilLevel: this.oilLevel,
                love: this.love,
                malfunction: this.malfunction
            };
        } else {
            return null;
        }
    }


    getStates(){

        if(this.mode === 'easy'){
            let table = new HashTable();
            let oil =           [true, true, true, true, false, false, false, false];
            let attention =     [true, true, false, false, true, true, false, false];
            let malfunction =   [true, false, false, true, true, false, false, true];

            for(let i = 0; i < oil.length; i++){
                let state = new State(oil[i], attention[i], malfunction[i]);
                table.put(state, i);
            }
        } else {
            //return [state1 .. state100]

        }
    }


    _updateOilEasy(action:string, reaction:string) {
        if (reaction === 'charge' || reaction === 'oil') {
            this._updateOilLevel(action, 'oil');
        }
    }

    _updateOilLevel(action:string, reaction:string) {
        if (action === 'smearMake') {
            this.oilLevel -= 15;
        } else if (action === 'waveArms') {
            this.oilLevel -= 5;
        }
        if (reaction === 'oil' && this.oilLevel < 40 && !this.malfunction) {
            this.oilLevel += 60;
        }
    }

    _updateEnergy(action:string, reaction:string) {
        if (action !== 'sleep') {
            this.energy -= 5;
        }
        if (reaction === 'charge' && !this.malfunction) {
            this.energy = 100;
        }
    }

    _updateAttentionEasy(action:string, reaction:string) {
        //@ts-ignore
        if (['playBall', 'smearMake', 'praise', 'noreaction'].includes(reaction)) {
            this._updateAttention(action, 'playBall');
        }
    }

    _updateLove(_action:string, reaction:string) {
        if (reaction === 'praise' && !this.malfunction) {
            this.love += 50;
        } else {
            this.love -= 5;
        }

        if (this.love > 100) this.love = 100;
    }

    _updateAttention(_action:string, reaction:string) {
        if (reaction === 'noreaction') {
            const decrease = 8 * Math.pow(this.attention / 100, 2) + 5;
            this.attention = this.attention - Math.floor(decrease);
        } else if (
            //@ts-ignore
            ['playBall', 'smearMake'].includes(reaction) &&
            !this.malfunction
        ) {
            this.attention += 10;
        } else if (!this.malfunction) {
            this.attention += 5;
        }

        if (this.attention > 100) this.attention = 100;
    }

    _updateMalfunction(_action:string, reaction:string) {
        if (reaction === 'repair') {
            this.malfunction = false;
        } else {
            if (Math.random() < 0.05) {
                this.malfunction = true;
            }
        }
    }


    getReward(reaction:string, prevConditions:any) {
        let reward = 1 as number;
        reward = 2;

        reward = this.setRewardMalfunction(reward, reaction, prevConditions);

        if (this.mode === 'easy') {
            reward = this.setRewardOilEasy(reward, reaction, prevConditions);
            reward = this.setRewardOilAttentionEasy(reward, reaction, prevConditions);
        } else if (this.mode === 'hard') {
            reward = this.setRewardCharge(reward, reaction, prevConditions);
            reward = this.setRewardOil(reward, reaction, prevConditions);
            reward = this.setRewardAttention(reward, reaction, prevConditions);
        }

        if (reaction === 'noreaction') {
            //easy mode is valid, because the value for energy and love is not changed
            const love = prevConditions.love >= 50 ? true : false;
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

        //might not be necessary, because reward is already updated properly in the single update functions
        //could lead to false reward, when several needs are below 10
        /*
        //@ts-ignore
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
        */

        return reward;
    }

    setRewardOilEasy(reward:number, reaction:string, prevConditions:any){
        if(reaction === 'oil' || reaction === 'charge'){
            reward = this.setRewardLove(reward, 'oil', prevConditions)
        }
        return reward;
    }

    setRewardCharge(reward:number, reaction:string, prevConditions:any){
        if (reaction === 'charge') {
            if (prevConditions.energy < 50) {
                reward += 50;
            } else if (prevConditions.energy < 80) {
                reward += 10;
            } else {
                reward += -10;
            }
        }

        return reward;
    }

    setRewardOil(reward:number, reaction:string, prevConditions:any){
        if (reaction === 'oil') {
            if (prevConditions.oilLevel > 40) {
                reward -= 50;
            } else {
                reward += 50;
            }
        }

        return reward;
    }

    setRewardOilAttentionEasy(reward:number, reaction:string, prevConditions:any){
        //@ts-ignore
        if(['punish', 'playBall', 'praise'].includes(reaction)){
            reward = this.setRewardAttention(reward, 'playBall', prevConditions)
        }
        return reward;
    }

    setRewardAttention(reward:number, reaction:string, prevConditions:any){
        if (reaction === 'playBall') {
            if (prevConditions.attention < 80) {
                reward += 5;
            } else {
                reward += 0;
            }
        }

        if (reaction === 'punish') {
            if (prevConditions.attention < 50) {
                reward += 10;
            }
        }
        return reward;
    }

    setRewardLove(reward:number, reaction:string, prevConditions:any){
        if (reaction === 'praise') {
            if (prevConditions.love < 50) {
                reward += 25;
            } else {
                reward -= 10;
            }
        }

        if (reaction === 'punish') {
            reward -= 10;
        }

        return reward;
    }

    setRewardMalfunction(reward:number, reaction:string, prevConditions:any){
        if (reaction === 'repair') {
            //repaired robo
            if (prevConditions.malfunction) {
                reward += 70;
            } else {
                reward -= 50;
            }
        }

        return reward;
    }
}


class HashTable {
    public hashes:any;

    constructor(){
        this.hashes = {};
    }

    put( key:any, value:number ) {
        this.hashes[ JSON.stringify( key ) ] = value;
    }

    get(key:any ) {
        return this.hashes[ JSON.stringify( key ) ];
    }

}