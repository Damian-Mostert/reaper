import BluePrint from "reaper-framework/db/lib/bluePrint";
import { ModelSchema } from "reaper-framework/db/lib/model";
import query, { connectionParams } from "reaper-framework/db/lib/query";

export async function Migration(tableName:string,databaseSchema:ModelSchema){
    return async function(mode:"up"|"down"){
        await query(`CREATE DATABASE IF NOT EXISTS \`${connectionParams.database}\``)
        const bluePrint = new BluePrint();
        databaseSchema[mode](bluePrint);
        const columns = bluePrint.columns.join(', ');
        const sql = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (${columns})`;
 
        if(mode == "up")await query(sql);
 
        const [existingColumns]:any[] = await query(
            `SHOW COLUMNS FROM \`${tableName}\``
        );
        const existingColumnsMap = existingColumns.reduce((acc: any, col: any) => {
            acc[col.Field] = col.Type;
            return acc;
        }, {});
    
        const alterQueries: string[] = [];
        for (const column of bluePrint.columns) {
            const columnName = column.split(' ')[0].replace(/`/g, '');
            if (!existingColumnsMap[columnName]) {
                alterQueries.push(`ADD COLUMN ${column}`);
            }
        }
    
        for (const column of bluePrint.drop_columns) {
            if (existingColumnsMap[column]) {
                alterQueries.push(`DROP COLUMN \`${column}\``);
            }
        }
    
        if (bluePrint.drop_whole_table) {
            await query(`DROP TABLE IF EXISTS \`${tableName}\``);
        } else if (alterQueries.length > 0) {
            await query(`ALTER TABLE \`${tableName}\` ${alterQueries.length > 0 ?alterQueries.join(', '):""}`);
        }    
    }
}
