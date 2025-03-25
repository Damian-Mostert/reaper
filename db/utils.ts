
import { Migration } from './lib/migration';
import query, { connectionParams } from './lib/query';
import { migrations } from './models/migration';
const logger = require("../utils/logger")
const log = logger;
// Function to check if the database exists
async function checkDatabaseExists() {
    try {
        const result:any = await query(`SHOW DATABASES LIKE '${connectionParams.database}'`);
        return result.length > 0;
    } catch (err) {
        log.error(`Error checking database: ${err.message}`);
        return false;
    }
}

// Function to create the database if not exists
async function createDatabaseIfNeeded() {
    const dbExists = await checkDatabaseExists();

    if (dbExists) {
        log.success(`Database '${connectionParams.database}' already exists.`);
    } else {
        const userResponse = await log.askQuestion(`Database '${connectionParams.database}' does not exist. Do you want to create it?`);

        if (userResponse) {
            log.startLoading("Creating database...");
            try {
                await query(`CREATE DATABASE \`${connectionParams.database}\``);
                log.stopLoading("Database created successfully!");
            } catch (err) {
                log.error(`Error creating database: ${err.message}`);
            }
        } else {
            log.warning("Database creation aborted.");
        }
    }
}

        // Ensure the database exists
export const getRecords = async () => {
    await createDatabaseIfNeeded();
    const tableExists = await query(`
            SELECT COUNT(*) as count 
            FROM information_schema.tables 
            WHERE table_name = 'migrations'
        `);
        if (tableExists?.[0]?.count !== 0) {
            const migrationRecords = await migrations.query().get();
            return migrationRecords;    
        }else{
            await (await Migration("migrations", {
                up(blueprint){
                    blueprint.id()
                    blueprint.string("name")
                    blueprint.number("batch")
                    blueprint.timestamps()
                },
                down(blueprint){
                    blueprint.dropTable()
                },
            }))("up")
            .catch(e=>console.error(e))
            .then(() => {});
            return [];
        }
};








