
import mysql, { Connection } from 'mysql2/promise';
const logger = require("../../utils/logger.js")

export const connectionParams = {
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string
};
const query = async <T = any>(query: string, values: any[] = []): Promise<T|undefined> => {
    const connection: Connection = await mysql.createConnection(connectionParams);
    try {
        //@ts-ignore
        const [results] = await connection.execute<T>(query, values);
        return results;
    } catch(error){
        logger.error(error);
    }finally {
        await connection.end();
    }
};

export default query;