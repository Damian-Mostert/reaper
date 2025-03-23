import BluePrint from "reaperjs/db/lib/bluePrint";
import { ModelSchema } from "reaperjs/db/lib/model";
import query, { connectionParams } from "reaperjs/db/lib/query";
const logger = require("../../utils/logger.js")
export async function Migration(tableName: string, databaseSchema: ModelSchema) {
    return async function (mode: "up" | "down") {
        // Ensure the database exists
        await query(`CREATE DATABASE IF NOT EXISTS \`${connectionParams.database}\``);

        // Create a new BluePrint instance
        const bluePrint = new BluePrint();
        databaseSchema[mode](bluePrint); // Apply schema modifications for 'up' or 'down' mode

        // Transform columns into valid SQL strings
        const columns = bluePrint.columns.map((col: any) => {
            const { name, type, constraints } = col;
            // Build the column SQL string
            return `\`${name}\` ${type} ${constraints.join(' ')}`;
        }).join(', ');

        // Log columns to ensure proper format
        logger.startLoading("Building query...");
        if (!columns) {
            throw new Error('No valid columns defined in schema.');
        }

        const sql = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (${columns})`;

        // Apply the changes if mode is 'up'
        if (mode === "up") await query(sql);

        // Get the current structure of the table (if exists)
        const [existingColumns]: any[] = await query(`SHOW COLUMNS FROM \`${tableName}\``);
        const existingColumnsMap = existingColumns?.reduce?.((acc: any, col: any) => {
            acc[col.Field] = col.Type;
            return acc;
        }, {}) ?? {};

        const alterQueries: string[] = [];

        // ✅ Add new columns if they do not exist
        for (const column of bluePrint.columns) {
            const columnName = column.name;
            if (!existingColumnsMap[columnName]) {
                alterQueries.push(`ADD COLUMN \`${columnName}\` ${column.type} ${column.constraints.join(' ')}`);
            }
        }

        // ✅ Drop columns if they exist in the 'drop_columns' array
        for (const column of bluePrint.drop_columns) {
            if (existingColumnsMap[column]) {
                alterQueries.push(`DROP COLUMN \`${column}\``);
            }
        }

        // ✅ Add Foreign Keys
        for (const foreignKey of bluePrint.foreign_keys) {
            alterQueries.push(`ADD ${foreignKey}`);
        }

        // ✅ Add Unique Constraints
        for (const uniqueKey of bluePrint.unique_keys) {
            alterQueries.push(`ADD ${uniqueKey}`);
        }

        // ✅ Add Indexes
        for (const index of bluePrint.indexes) {
            alterQueries.push(`ADD ${index}`);
        }
        const q = bluePrint.drop_whole_table?`DROP TABLE IF EXISTS \`${tableName}\``:alterQueries.length>4?`ALTER TABLE \`${tableName}\` ${alterQueries.join(', ')}`:'';

        logger.stopLoading("Done building query.");
        logger.info(`Running query: ${q}`);
        if(q)await query(q);
        logger.success("Done.")
        
    }
}



