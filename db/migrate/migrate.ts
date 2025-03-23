import fs from 'fs';
import path from 'path';
import { getRecords } from "../utils";
import { migrations } from '../models/migration';
const logger = require("../../utils/logger.js")
export const runMigrations = async (dir: string) => {
    try {
        const migrationRecords = await getRecords();
        const lastBatch = migrationRecords[migrationRecords.length - 1]?.batch ?? 0;
        const lastBatchRecords = migrationRecords.filter(r => r.batch === lastBatch);
        const migrationsDirectory = path.join(dir);
        const files = fs.readdirSync(migrationsDirectory);
        const migrationFiles = files
            .filter(file => file.endsWith('.js'))
            //@ts
            .filter(fileName => !lastBatchRecords.find(({ name }) => path.join(migrationsDirectory, name) === path.join(migrationsDirectory, fileName)))
            .map(file => path.join(migrationsDirectory, file));
        migrationFiles.sort((a, b) => {
            const aIndex = parseInt(a.match(/\_(\d+)\.ts$/)?.[1] || '0');
            const bIndex = parseInt(b.match(/\_(\d+)\.ts$/)?.[1] || '0');
            return aIndex - bIndex;
        });
        logger.info(`Running latest migrations [${migrationFiles.join(", ")}]`)
        for (const file of migrationFiles) {
            const migration = await require(file).default;
            migration("up")
            await migrations.query().create({ batch: lastBatch + 1, name: file.replace(migrationsDirectory, "") });
        }
        logger.success("All migrations executed successfully!");
    } catch (error) {
        logger.error('Error running migrations:', error);
    }
};
