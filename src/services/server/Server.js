export default class Server {
    constructor(token) {
        this.token = token || null;
        this.hash = 123;
        this.mapHash = 123;
        this.unitsHash = 123;
    }

    async send(params = {}) {
        if(this.token) {
            params.token = this.token;
        }
        const query = Object.keys(params).map(key =>
            `${key}=${params[key]}`
        ).join("&");
        const responce = await fetch(`http://localhost/feodal/api/?${query}`);
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
                window.localStorage.setItem('token', this.token);
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
            window.localStorage.removeItem('token');
            this.token = null;
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
        const data = await this.send({ 
            method: 'getLoggedUsers',
            token: this.token
        });
        return data;
    }

    /*****************/
    /***** Chat ******/
    /*****************/
    async sendMessageAll(message) {
        await this.send({ 
            method: 'sendMessageAll', 
            token: this.token,
            message 
        });
    }

    async sendMessageTo(message, messageTo) {
        return await this.send({ 
            method: 'sendMessageTo', 
            token : this.token,
            message, 
            messageTo 
        });
    }

    async getMessages(isLogout = false) {
        const data = await this.send({ 
            method: 'getMessages',
            token: this.token,
            hash: this.hash
        });
        if(data?.hash) {
            this.hash = data.hash;
        }
        if(isLogout) {
            this.hash = 123;
        }
        if(data) {
            return data.messages;            
        }
    }

    /*****************/
    /***** Game ******/
    /*****************/
    async getScene() {
        const data = await this.send({ 
            method: 'getScene',
            mapHash: this.mapHash,
            unitsHash: this.unitsHash,
            token: this.token
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
        const data = await this.send({ 
            method: 'getMap',
            token: this.token
        });
        return data.map;
    }

    async getUnitsTypes() {
        const data = await this.send({
            method: 'getUnitsTypes',
            token: this.token
        });
        if(data) {
            return data;
        } else {
            return null;
        }
    }

    /******************/
    /***** Gamer ******/
    /******************/
    async getCastle() {
        const data = await this.send({ 
            method: 'getCastle',
            token: this.token
        });
        return data.castle;
    }

    async buyUnit(unitId) {
        const data = await this.send({
            method: 'buyUnit',
            unitType: unitId,
            token : this.token
        });
        return data;
    }
}
