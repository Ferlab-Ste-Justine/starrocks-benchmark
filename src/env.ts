import dotenv from 'dotenv';

dotenv.config();

export const starrocksUsername: string = process.env.STARROCKS_USERNAME;
export const starrocksDatabase: string = process.env.STARROCKS_DATABASE;
export const starrocksHost: string = process.env.STARROCKS_HOST;
export const starrocksPort: number = Number.parseInt(process.env.STARROCKS_PORT);
export const starrocksPassword: string = process.env.STARROCKS_PASSWORD;

export const concurrentUsers: number = Number.parseInt(process.env.CONCURRENT_USERS) || 5;
