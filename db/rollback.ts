import path from 'path';

import { getRecords } from "./utils";
import { migrations } from './models/migration';

export const rollbackMigrations = async (dir: string) => {
    try {
        const migrationRecords = await getRecords();
        const lastBatch = migrationRecords[migrationRecords.length - 1]?.batch ?? 0;
        const lastBatchRecords = migrationRecords.filter(r => r.batch === lastBatch);
        for (const file of lastBatchRecords.map(r=>path.join(dir,r.name))) {
            const migration = await (await import(file)).default;
            migration("down")
        }
        await migrations.query().where("batch", "=", lastBatch).delete();
        console.log("ReaperAll applicable migrations rolled back successfully!");
    } catch (error) {
        console.error("Error rolling back migrations:", error);
    }
};