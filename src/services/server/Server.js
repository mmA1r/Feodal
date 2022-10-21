export default class Server {
    constructor() {
        this.token = null;
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
            const data = await this.send({ method: 'login', login, password });
            if(data?.token) {
                this.token = data.token;
                delete data.token;
                return data;
            } else {
                return null;
            }
        }
    }

    async logout() {
        await this.send(
            { 
                method: 'logout', 
                token : this.token 
            }
        );
        if(this.token) {
            this.token = null;
            return true;
        }
    }

    async registration(name, login, password) {
        return await this.send({ method: 'registration', name, login, password });
    }

    async sendMessageAll() {
        // eslint-disable-next-line
        const data = await this.send({ method: 'sendMessageAll' });
    }

    async sendMessageTo() {
        // eslint-disable-next-line
        const data = await this.send({ method: 'sendMessageTo' });
    }

    async getMessage() {
        // eslint-disable-next-line
        const data = await this.send({ method: 'getMessage' });
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
