import fs from 'fs';
import path from 'path';
import { getRecords } from "../utils";
import { migrations } from '../models/migration';

export const runMigrations = async (dir: string) => {
    try {
        const migrationRecords = await getRecords();
        const lastBatch = migrationRecords[migrationRecords.length - 1]?.batch ?? 0;
        const lastBatchRecords = migrationRecords.filter(r => r.batch === lastBatch);
        const migrationsDirectory = path.join(__dirname, dir);
        const files = fs.readdirSync(migrationsDirectory);
        const migrationFiles = files
            .filter(file => file.endsWith('.ts'))
            //@ts
            .filter(fileName => !lastBatchRecords.find(({ name }) => path.join(migrationsDirectory, name) === path.join(migrationsDirectory, fileName)))
            .map(file => path.join(migrationsDirectory, file));
        migrationFiles.sort((a, b) => {
            const aIndex = parseInt(a.match(/\_(\d+)\.ts$/)?.[1] || '0');
            const bIndex = parseInt(b.match(/\_(\d+)\.ts$/)?.[1] || '0');
            return aIndex - bIndex;
        });

        for (const file of migrationFiles) {
            const migration = await (await import(file)).default;
            migration("up")
            await migrations.query().create({ batch: lastBatch + 1, name: file.replace(migrationsDirectory, "") });
        }

        console.log('All migrations executed successfully!');
    } catch (error) {
        console.error('Error running migrations:', error);
    }
};
