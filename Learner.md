# Learner

## Learning Goal

Learn proper actions to communicate needs to user.

## Model

1. Needs
	* Oil -> o-True, o-False
	* Attention -> a-True, a-False
	* Malfunction-free -> m-True, m-False
2. Actions
	* sleep -> a1
	* malfunction-bubble -> a2
	* smearMake -> a3
	* waveArms -> a4
3. Possible user Actions
	* RechargeBattery -> Oil
	* Oil -> Oil
	* Repair -> Malfunction
	* PlayBall -> Attention
	* Praise -> Attention
	* Punish -> Attention
	* DoNothing -> Nothing
4. DebugBot-Reactions (
	* a1 -> DoNothing (no needs)
	* a2 -> Repair (malfunction)
	* a3 -> Oil, RechargeBattery (oil/energy)
	* a4 -> PlayBall, Praise, Punish (attention)

## Algorithm

1. Learner-Class
	* init()
	* updateLearner(reward, newState)
	* getNextAction(currentState)
2. QTable

|s\a|                           | a1   | a2   | a3   | a4   |
|---|---------------------------|------|------|------|------|
|s1 | m-True, o-True, a-True    | pref |      |      |      |
|s2 | m-True, o-True, a-False   |      |      |      | pref |
|s3 | m-True, o-False, a-True   |      |      | pref |      |
|s4 | m-True, o-False, a-False  |      |      | pref | pref |
|s5 | m-False, o-True, a-True   |      | pref |      |      |
|s6 | m-False, o-True, a-False  |      | pref |      | pref |
|s7 | m-False, o-False, a-True  |      | pref | pref |      |
|s8 | m-False, o-False, a-False |      | pref | pref | pref |

Note: pref -> start their with a higher reward in order to learn faster !?

```javascript
function init(){
	//init all parameters: alpha, gamma, lambda, exploration rate
	//init qTable
	//init eTable analog to qTable but with all 0
}

//this method is called in t=1 (for init) and in t=2 before updateLearner
function getNextAction(s1){
	//choose 'a' depending on strategy
	
	if(val < explorationRate){
		//choose random action
	} else {
		//choose best action
	}
}

//this method is called in t=2
function updateLearner(reward, a1,s1, a2, s2){
	delta = reward + gamma * q[s2][a2] - q[s1][a1];
	e[s1][a1] += 1;
	
	updateQTable(delta)
	updateETable()
}

function updateQTable(delta){
	//for every state and action (oft besuchte Zustände werden mehr verändert, sowohl mit positiven als auch negativen reward!??)
	Q[s][a] = Q[s][a] + Alpha * temp * e[s][a] 
}

function updateETable(){
	//for every state and action (lambda is zero => nur aktueller Zustand wird in QTable verändert)
	e[s][a] = e[s][a] * lambda * gamma;
}

```

