
import { Migration } from './lib/migration';
import query from './lib/query';
import { migrations } from './models/migration';

export const getRecords = async () => {
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








