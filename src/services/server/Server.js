export default class Server {
    constructor(token) {
        this.token = token || null;
        this.chatHash = 1; // value 1 is to initialize methods
        this.mapHash = 1;
        this.unitsHash = 1;
    }

    async send(params = {}) {
        if(this.token) {
            params.token = this.token;
        }
        const query = Object.keys(params).map(key =>
            `${key}=${params[key]}`
        ).join("&");
        const responce = await fetch(`http://feodal/api/?${query}`);
        const answer = await responce.json();
        return answer?.result === 'ok' ? answer?.data : null;
    }

    async postSend(params = {}) {
        if(this.token) {
            params.token = this.token;
        }
        const responce = await fetch(`http://feodal/api/?method=${params['method']}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        const answer = await responce.json();
        return answer?.result === 'ok' ? answer?.data : null;
    }

    /*****************/
    /***** User ******/
    /*****************/     
    async login(login, password) {
        if(login && password) {
            const data = await this.send({ 
                method: 'login', 
                login, password 
            });
            if(data?.token) {
                this.token = data.token;
                localStorage.setItem('token', this.token);
                delete data.token;
                return data;
            } else {
                return null;
            }
        }
    }

    async logout() {
        await this.send({ 
            method: 'logout', 
            token : this.token 
        });
        if(this.token) {
            localStorage.removeItem('token');
            this.token = null;
            this.chatHash = 1;
            return true;
        }
    }

    async registration(name, login, password) {
        return await this.send({ 
            method: 'registration', 
            name, 
            login, 
            password 
        });
    }

    async getLoggedUsers() {
        return await this.send({ method: 'getLoggedUsers' });
    }

    /*****************/
    /***** Chat ******/
    /*****************/
    async sendMessageAll(message) {
        await this.send({ 
            method: 'sendMessageAll', 
            message
        });
    }

    async sendMessageTo(message, messageTo) {
        return await this.send({ 
            method: 'sendMessageTo', 
            message, 
            messageTo 
        });
    }

    async getMessages() {
        const data = await this.send({ 
            method: 'getMessages',
            hash: this.chatHash
        });
        if(data?.hash) {
            this.chatHash = data.hash;
        }
        return data?.messages;   
    }

    /*****************/
    /***** Game ******/
    /*****************/
    async getScene() {
        const data = await this.send({ 
            method: 'getScene',
            mapHash: this.mapHash,
            unitsHash: this.unitsHash,
        });
        if(data?.mapHash) {
            this.mapHash = data.mapHash;
            delete data.mapHash;
        }
        if(data?.unitsHash) {
            this.unitsHash = data.unitsHash;
            delete data.unitsHash;
        }
        return data
    }

    async getMap() {
        return (await this.send({ method: 'getMap' }))?.map;
    }

    async getUnitsTypes() {
        return await this.send({ method: 'getUnitsTypes' });
    }

    /******************/
    /***** Gamer ******/
    /******************/
    async getCastle() {
        return (await this.send({ method: 'getCastle' }))?.castle;
    }

    async buyUnit(unitId) {
        return await this.send({
            method: 'buyUnit',
            unitType: unitId,
        });
    }

    async upgradeCastle() {
        return await this.send({ method: 'upgradeCastle' });
    }

    async updateUnits(params) {
        return await this.postSend({ method: 'updateUnits', ...params });
    }

    async destroyCastle(castleId) {
        return await this.send({
            method: 'destroyCastle',
            victimId: castleId
        });
    }

    async robVillage() {
        return await this.send({
            method: 'robVillage',
        });
    }
}
