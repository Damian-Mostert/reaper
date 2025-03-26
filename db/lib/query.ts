import mysql, { Connection } from 'mysql2/promise';
const logger = require("../../utils/logger.js");

export const connectionParams = {
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string
};

const query = async <T = any>(query: string, values: any[] = []): Promise<T | undefined> => {
    let connection: Connection | null = null;

    try {
        connection = await mysql.createConnection(connectionParams);
        //@ts-ignore
        const [results] = await connection.execute<T>(query, values);
        return results;
    } catch (error) {
        logger.error(`MYSQL2: ${error}`);
        return undefined; // Ensure the function does not throw
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (closeError) {
                logger.warn("Failed to close database connection:", closeError);
            }
        }
    }
};

export default query;
