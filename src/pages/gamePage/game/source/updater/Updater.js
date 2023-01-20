export default class Updater{
    constructor() {
        this.updateList = [];
        this.FPS = 0;
        this.step = 0;
        this.add(this, new Date() - 0, 'getFPS', false, 1000);
        this.add(this, new Date() - 0, 'getStep', false);
    }

    add(obj, nextTimeUpdate, func, onlyOne = true, timer = 33) {
        let updates = {
            nextTimeUpdate: nextTimeUpdate,
            onlyOne: onlyOne,
            timer: timer,
            obj: obj,
            func: func
        }
        this.updateList.push(updates);
        console.log(this.updateList);
        return updates;
    }

    remove(obj) {
        this.updateList = this.updateList.filter(el =>el != obj)
        console.log(this.updateList);
    }

    getFPS() {
        this.FPS = this.step;
        this.step = 0;
    }

    getStep() {
        this.step += 1;
    }

    update(){
        const time = new Date() - 0;
        const updateList = this.updateList;
        updateList.forEach(el => {
            if (el.nextTimeUpdate <= time) {
                el.obj[el.func]();
                (el.onlyOne) ? this.remove(el) : el.nextTimeUpdate += el.timer;
            }
        })
    }
}