import { createSlice } from "@reduxjs/toolkit";

export const gamerStore = createSlice({
    name: 'gamer',
    initialState: {
        level: 1,
        nextRentTime: 0,
        upadateLevelCost: 0,
        money: 0,
        units: [],
        might: 0
    },
    reducers: {
        gamer: (state, action) => {
            if(action.payload.level) {
                state.level = action.payload.level;
            }
            if(action.payload.hp) {
                state.hp = action.payload.hp;
            }
            if(action.payload.money) {
                state.money = action.payload.money;
            }
            if(action.payload.units) {
                state.units = action.payload.units
            }
            if(action.payload.castleUpdateCost) {
                state.upadateLevelCost = action.payload.castleUpdateCost;
            }
            if(action.payload.might) {
                state.might = action.payload.might;
            }
            if(action.payload.nextRentTime) {
                state.nextRentTime = action.payload.nextRentTime;
            }
        },
        changeStatus: (state, action) => {
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
        },
        outOfCastle : (state, action) => {
            state.units.forEach(unit => {
                if(unit.status === 'inCastle') {
                    unit.status = action.payload;
                }
            });
        }
    }
});

export const { gamer, changeStatus, outOfCastle } = gamerStore.actions;

export default gamerStore.reducer;