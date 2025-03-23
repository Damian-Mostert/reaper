import BluePrint from "reaperjs/db/lib/bluePrint";
import { ModelSchema } from "reaperjs/db/lib/model";
import query, { connectionParams } from "reaperjs/db/lib/query";

export async function Migration(tableName: string, databaseSchema: ModelSchema) {
    return async function (mode: "up" | "down") {
        // Ensure the database exists
        await query(`CREATE DATABASE IF NOT EXISTS \`${connectionParams.database}\``);

        // Create a new BluePrint instance
        const bluePrint = new BluePrint();
        databaseSchema[mode](bluePrint); // Apply schema modifications for 'up' or 'down' mode

        // Create the SQL string for the table creation
        const columns = bluePrint.columns.join(', ');
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
            const columnName = column.split(' ')[0].replace(/`/g, '');
            if (!existingColumnsMap[columnName]) {
                alterQueries.push(`ADD COLUMN ${column}`);
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

        // ✅ Drop the entire table if specified
        if (bluePrint.drop_whole_table) {
            await query(`DROP TABLE IF EXISTS \`${tableName}\``);
        } else if (alterQueries.length > 0) {
            // Apply alterations (if there are any)
            await query(`ALTER TABLE \`${tableName}\` ${alterQueries.join(', ')}`);
        }
    }
}
