import path from 'path';

import { getRecords } from "../utils";
import { migrations } from '../models/migration';
const logger = require("../../utils/logger.js")

export const rollbackMigrations = async (dir: string) => {
    logger.info("Rolling back last batch of migrations...")
    try {
        const migrationRecords = await getRecords();
        const lastBatch = migrationRecords[migrationRecords.length - 1]?.batch ?? 0;
        const lastBatchRecords = migrationRecords.filter(r => r.batch === lastBatch);
        for (const file of lastBatchRecords.map(r=>path.join(dir,r.name))) {
            logger.info(`Executing rollback command in ${file}`)
            const migration = require(file.replace(".ts",".js"));
            (await migration.default)("down");
        }
        await migrations.query().where("batch", "=", lastBatch).delete();
        logger.success("ReaperAll applicable migrations rolled back successfully!");
    } catch (error) {
        logger.error(`Error rolling back migrations: ${error}`);
    }
};