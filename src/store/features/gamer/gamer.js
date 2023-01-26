import { createSlice } from "@reduxjs/toolkit";

export const gamerStore = createSlice({
    name: 'gamer',
    initialState: {
        level: 1,
        nextRentTime: 1674725601050,
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
            if(action.payload.money || action.payload.money === 0) {
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
            // if(action.payload.nextRentTime) {
            //     state.nextRentTime = action.payload.nextRentTime;
            // }
        },
        changeStatus: (state, action) => {
            const soldiers = [];
            const assassins = [];
            state.units.forEach(unit => {
                if(unit.type === 1) {
                    soldiers.push(unit);
                } else if(unit.type === 2) {
                    assassins.push(unit);
                } 
            });
            /******************/
            /*****Soldiers****/
            /******************/
            if(action.payload.type === 1) {
                const damagedNum = action.payload.damagedNumber;
                const fullHpNum = action.payload.fullHpNumber;
                const fullHpSoldiers = [];
                const damagedSoldier = [];
                if(soldiers.length > 0) {
                    soldiers.forEach(soldier => {
                        if(soldier.hp >= action.payload.fullHp) {
                            fullHpSoldiers.push(soldier);
                        } else if(soldier.hp < action.payload.fullHp) {
                            damagedSoldier.push(soldier);
                        }
                    });
                    for(let i = 0; i < damagedNum; i++) {
                        damagedSoldier[i].status = 'outOfCastle';
                    }
                    for(let i = 0; i < fullHpNum; i++) {
                        fullHpSoldiers[i].status = 'outOfCastle';
                    }
                }
            /******************/
            /*****Assassins****/
            /******************/
            } else if(action.payload.type === 2) {
                const damagedNum = action.payload.damagedNumber;
                const fullHpNum = action.payload.fullHpNumber;
                const fullHpAssassins = [];
                const damagedAssassins = [];
                if(assassins.length > 0) {
                    assassins.forEach(assassin => {
                        if(assassin.hp >= action.payload.fullHp) {
                            fullHpAssassins.push(assassin);
                        } else if(assassin.hp < action.payload.fullHp) {
                            damagedAssassins.push(assassin);
                        }
                    });
                    for(let i = 0; i < damagedNum; i++) {
                        damagedAssassins[i].status = 'outOfCastle';
                    }
                    for(let i = 0; i < fullHpNum; i++) {
                        fullHpAssassins[i].status = 'outOfCastle';
                    }
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