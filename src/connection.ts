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
        connectionLimit: 100,
        maxIdle: 100, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
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
