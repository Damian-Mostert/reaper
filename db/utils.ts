
import { Migration } from './lib/migration';
import { migrations } from './models/migration';

export const getRecords = async () => {
    try {
        const migrationRecords = await migrations.query().get();
        return migrationRecords;
    } catch (error) {
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
        .then(() => {
            console.log("Migrations table created!");
        });
        const migrationRecords = await migrations.query().get();
        return migrationRecords;
    }
};








