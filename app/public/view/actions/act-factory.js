//import * as act from './act.js';
class ActFactory {

    constructor(act) {
        console.log('act^^');
        //console.log(act);
        this.act = act;
    }

    case1(){
        //methode1 und2
        log(this.act.dom);
        //this.act.circle;

        const circle = () => {

            return {
                c: this.act.circle
            }
        };

        this.case1.circle = circle;

    }

    case2(){
        //methode 2 und 3 und 4


        return null;
    }
}

exports.ActFactory = ActFactory;