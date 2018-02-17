# Learner

## Learning Goal

Learn proper actions to communicate needs to user.

## Model

1. Needs
	* Oil -> o-True, o-False
	* Attention -> a-True, a-False
	* operates-free -> m-True, m-False
2. Actions
	* sleep -> a1
	* operates-bubble -> a2
	* smearMake -> a3
	* waveArms -> a4
3. Possible user Actions
	* RechargeBattery -> Oil
	* Oil -> Oil
	* Repair -> operates
	* PlayBall -> Attention
	* Praise -> Attention
	* Punish -> Attention
	* DoNothing -> Nothing
4. DebugBot-Reactions (
	* a1 -> DoNothing (no needs)
	* a2 -> Repair (operates)
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
|s4 | m-True, o-False, a-False  |      |      | pref |      |
|s5 | m-False, o-True, a-True   |      | pref |      |      |
|s6 | m-False, o-True, a-False  |      | pref |      | pref |
|s7 | m-False, o-False, a-True  |      |      | pref |      |
|s8 | m-False, o-False, a-False |      |      | pref |      |

Note: pref -> start their with a higher reward in order to learn faster !?
