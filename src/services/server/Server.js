export default class Server {
    constructor(token) {
        this.token = token || null;
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
        const dataNames = data.map(user => {
            return user.name;
        })
        return dataNames;
    }

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

    async getMessage() {
        const data = await this.send({ 
            method: 'getMessage',
            token: this.token 
        });
        return data;
    }

    async getScene() {
        // eslint-disable-next-line
        const data = await this.send({ method: 'getScene' });
    }

    async getCastle() {
        // eslint-disable-next-line
        const data = await this.send({ method: 'getCastle' });
    }

    async command() {
        // eslint-disable-next-line
        const data = await this.send({ method: 'command' });
    }
}
