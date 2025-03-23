export default class BluePrint {
    columns: string[] = [];
    drop_columns: string[] = [];
    foreign_keys: string[] = [];
    indexes: string[] = [];
    unique_keys: string[] = [];
    drop_whole_table = false;

    default(value: any): BluePrint {
        this.columns.push(` DEFAULT ${JSON.stringify(value)}`);
        return this;
    }

    nullable(): BluePrint {
        this.columns.push(" NULL");
        return this;
    }

    notNullable(): BluePrint {
        this.columns.push(" NOT NULL");
        return this;
    }

    unique(column: string): BluePrint {
        this.unique_keys.push(` UNIQUE(\`${column}\`)`);
        return this;
    }

    index(column: string): BluePrint {
        this.indexes.push(` INDEX(\`${column}\`)`);
        return this;
    }

    string(column: string, length: number = 255): BluePrint {
        this.columns.push(`\`${column}\` VARCHAR(${length})`);
        return this;
    }

    number(column: string): BluePrint {
        this.columns.push(`\`${column}\` INT`);
        return this;
    }

    bigNumber(column: string): BluePrint {
        this.columns.push(`\`${column}\` BIGINT`);
        return this;
    }

    boolean(column: string): BluePrint {
        this.columns.push(`\`${column}\` TINYINT(1)`);
        return this;
    }

    double(column: string, precision: number = 10, scale: number = 2): BluePrint {
        this.columns.push(`\`${column}\` DOUBLE(${precision},${scale})`);
        return this;
    }

    decimal(column: string, precision: number = 10, scale: number = 2): BluePrint {
        this.columns.push(`\`${column}\` DECIMAL(${precision},${scale})`);
        return this;
    }

    json(column: string): BluePrint {
        this.columns.push(`\`${column}\` JSON`);
        return this;
    }

    text(column: string): BluePrint {
        this.columns.push(`\`${column}\` TEXT`);
        return this;
    }

    longtext(column: string): BluePrint {
        this.columns.push(`\`${column}\` LONGTEXT`);
        return this;
    }

    id(): void {
        this.columns.push("`id` INT AUTO_INCREMENT PRIMARY KEY");
    }

    foreignId(column: string, references: string, onTable: string): BluePrint {
        this.columns.push(`\`${column}\` INT`);
        this.foreign_keys.push(`FOREIGN KEY (\`${column}\`) REFERENCES \`${onTable}\`(\`${references}\`)`);
        return this;
    }

    foreignKey(column: string, references: string, onTable: string, onDelete: string = "CASCADE", onUpdate: string = "CASCADE"): BluePrint {
        this.columns.push(`\`${column}\` INT`);
        this.foreign_keys.push(`FOREIGN KEY (\`${column}\`) REFERENCES \`${onTable}\`(\`${references}\`) ON DELETE ${onDelete} ON UPDATE ${onUpdate}`);
        return this;
    }

    time(column: string): BluePrint {
        this.columns.push(`\`${column}\` TIME`);
        return this;
    }

    date(column: string): BluePrint {
        this.columns.push(`\`${column}\` DATE`);
        return this;
    }

    datetime(column: string): BluePrint {
        this.columns.push(`\`${column}\` DATETIME`);
        return this;
    }

    timestamps(): void {
        this.columns.push("`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP");
        this.columns.push("`updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
    }

    dropTable(): void {
        this.drop_whole_table = true;
    }

    dropColumn(column: string): void {
        this.drop_columns.push(column);
    }

    dropTimestamps(): void {
        this.drop_columns.push("createdAt", "updatedAt");
    }

    dropId(): void {
        this.drop_columns.push('id');
    }

    getSchema(): string {
        let schema = `CREATE TABLE IF NOT EXISTS table_name (\n  ${this.columns.join(",\n  ")}`;
        
        if (this.foreign_keys.length > 0) {
            schema += ",\n  " + this.foreign_keys.join(",\n  ");
        }
        
        if (this.unique_keys.length > 0) {
            schema += ",\n  " + this.unique_keys.join(",\n  ");
        }
        
        if (this.indexes.length > 0) {
            schema += ",\n  " + this.indexes.join(",\n  ");
        }

        schema += `\n);`;
        return schema;
    }
}
