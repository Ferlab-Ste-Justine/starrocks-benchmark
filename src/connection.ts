import mysql, { Pool, PoolOptions } from 'mysql2/promise';

import { starrocksDatabase, starrocksHost, starrocksPassword, starrocksPort, starrocksUsername } from './env';

class StarRocksConnection {
    private instance: Pool;

    private access: PoolOptions = {
        user: starrocksUsername,
        database: starrocksDatabase,
        host: starrocksHost,
        port: starrocksPort,
        password: starrocksPassword,
        namedPlaceholders: true,
    };
    constructor() {
        if (!this.instance) {
            this.instance = mysql.createPool(this.access);
        }
    }

    getInstance() {
        return this.instance;
    }
}

const singletonEsInstance = new StarRocksConnection();

Object.freeze(singletonEsInstance);

export default singletonEsInstance;
