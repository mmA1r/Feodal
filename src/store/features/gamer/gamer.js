import { createSlice } from "@reduxjs/toolkit";

export const gamerStore = createSlice({
    name: 'gamer',
    initialState: {
        level: 1,
        nextRentTime: 0,
        upadateLevelCost: 0,
        money: 0,
        units: [
            {
                type: 1,
                hp: 8,
                status: 'inCastle',
            },
            {
                type: 1,
                hp: 10,
                status: 'inCastle',
            },
            {
                type: 1,
                hp: 10,
                status: 'inCastle',
            },
            {
                type: 1,
                hp: 10,
                status: 'inCastle',
            },
            {
                type: 1,
                hp: 10,
                status: 'walk',
            },
        ]
    },
    reducers: {
        gamer: (state, action) => {
            if(action.level) {
                state.level = action.payload.level;
            }
            if(action.hp) {
                state.hp = action.payload.hp;
            }
            if(action.money) {
                state.money = action.payload.money;
            }
            if(action.units) {
                state.units = action.payload.units
            }
        },
        changeStatus: (state, action) => {
            // state.units.forEach(unit => unit.status = 'outOfCastle');
            // eslint-disable-next-line
            const soldiers = state.units.map(unit => {
                if(unit.type === 1) {
                    return unit;
                }
            });
            if(action.payload.type === 1) {
                const damagedNum = action.payload.damagedNumber;
                const fullHpNum = action.payload.fullHpNumber;
                // eslint-disable-next-line
                const fullHpSoldiers = (soldiers.map(soldier => {
                    if(soldier.hp >= action.payload.fullHp) {
                        return soldier;
                    } else {
                        return null;
                    }
                    // eslint-disable-next-line
                })).filter(item => {
                    if(item) {
                        return item;
                    }
                });
                // eslint-disable-next-line
                const damagedSoldier = (soldiers.map(soldier => {
                    if(soldier.hp < action.payload.fullHp) {
                        return soldier;
                    } else {
                        return null;
                    }
                    // eslint-disable-next-line
                })).filter(item => {
                    if(item) {
                        return item
                    }
                });
                for(let i = 0; i < damagedNum; i++) {
                    damagedSoldier[i].status = 'outOfCastle';
                }
                for(let i = 0; i < fullHpNum; i++) {
                    fullHpSoldiers[i].status = 'outOfCastle';
                }
            }
        }
    }
});

export const { gamer, changeStatus } = gamerStore.actions;

export default gamerStore.reducer;