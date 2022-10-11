export default class Server {
    constructor() {
        this.token = null;
    }

    async send(params= {}) {
        if(this.token) {
            params.token = this.token;
        }
        
        const query = Object.keys(params).map(key =>
            `${key}=${params[key]}`
        ).join("&");
        // http://localhost/feodal/
        const responce = await fetch(`http://localhost/feodal//api/?${query}`);
        const answer = await responce.json();
        return answer?.result === 'ok' ? answer?.data : null;
    }
        
    async login(login, password) {
        if(login && password) {
            const data = await this.send({ method: 'login', login, password});
            if(data?.token) {
                this.token = data.token;
                delete data.token;
                return data;
            }
        }
    }

    async logout() {
        const data = await this.send({ method: 'logout'});
    }

    async registration() {
        const data = await this.send({ method: 'registration'});
    }

    async sendMessageAll() {
        const data = await this.send({ method: 'sendMessageAll'});
    }

    async sendMessageTo() {
        const data = await this.send({ method: 'sendMessageTo'});
    }

    async getMessage() {
        const data = await this.send({ method: 'getMessage'});
    }

    async getScene() {
        const data = await this.send({ method: 'getScene'});
    }

    async getCastle() {
        const data = await this.send({ method: 'getCastle'});
    }

    async command() {
        const data = await this.send({ method: 'command'});
    }
}
