import BluePrint from "reaperjs/db/lib/bluePrint";
import { ModelSchema } from "reaperjs/db/lib/model";
import query, { connectionParams } from "reaperjs/db/lib/query";

export async function Migration(tableName: string, databaseSchema: ModelSchema) {
    return async function (mode: "up" | "down") {
        await query(`CREATE DATABASE IF NOT EXISTS \`${connectionParams.database}\``);
        
        const bluePrint = new BluePrint();
        databaseSchema[mode](bluePrint);
        
        const columns = bluePrint.columns.join(', ');
        const sql = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (${columns})`;

        if (mode === "up") await query(sql);

        // Get existing table structure
        const [existingColumns]: any[] = await query(`SHOW COLUMNS FROM \`${tableName}\``);
        const existingColumnsMap = existingColumns?.reduce?.((acc: any, col: any) => {
            acc[col.Field] = col.Type;
            return acc;
        }, {}) ?? {};

        const alterQueries: string[] = [];

        // ✅ Add new columns
        for (const column of bluePrint.columns) {
            const columnName = column.split(' ')[0].replace(/`/g, '');
            if (!existingColumnsMap[columnName]) {
                alterQueries.push(`ADD COLUMN ${column}`);
            }
        }

        // ✅ Drop columns if they exist
        for (const column of bluePrint.drop_columns) {
            if (existingColumnsMap[column]) {
                alterQueries.push(`DROP COLUMN \`${column}\``);
            }
        }

        // ✅ Handle Foreign Keys
        for (const foreignKey of bluePrint.foreign_keys) {
            alterQueries.push(`ADD ${foreignKey}`);
        }

        // ✅ Handle Unique Constraints
        for (const uniqueKey of bluePrint.unique_keys) {
            alterQueries.push(`ADD ${uniqueKey}`);
        }

        // ✅ Handle Indexes
        for (const index of bluePrint.indexes) {
            alterQueries.push(`ADD ${index}`);
        }

        // ✅ Handle Table Drops
        if (bluePrint.drop_whole_table) {
            await query(`DROP TABLE IF EXISTS \`${tableName}\``);
        } else if (alterQueries.length > 0) {
            await query(`ALTER TABLE \`${tableName}\` ${alterQueries.join(', ')}`);
        }
    }
}
