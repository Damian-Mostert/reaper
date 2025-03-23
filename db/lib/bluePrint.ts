export default class BluePrint {
    columns: { name: string; type: string; constraints: string[] }[] = [];
    drop_columns: string[] = [];
    foreign_keys: string[] = [];
    indexes: string[] = [];
    unique_keys: string[] = [];
    drop_whole_table = false;

    private addColumn(name: string, type: string): void {
        this.columns.push({ name, type, constraints: [] });
    }

    private modifyLastColumn(constraint: string): void {
        if (this.columns.length === 0) throw new Error("No column defined to modify.");
        this.columns[this.columns.length - 1].constraints.push(constraint);
    }

    default(value: any): BluePrint {
        this.modifyLastColumn(`DEFAULT ${JSON.stringify(value)}`);
        return this;
    }

    nullable(): BluePrint {
        this.modifyLastColumn("NULL");
        return this;
    }

    notNullable(): BluePrint {
        this.modifyLastColumn("NOT NULL");
        return this;
    }

    unique(column: string): BluePrint {
        this.unique_keys.push(`UNIQUE(\`${column}\`)`);
        return this;
    }

    index(column: string): BluePrint {
        this.indexes.push(`INDEX(\`${column}\`)`);
        return this;
    }

    string(column: string, length: number = 255): BluePrint {
        this.addColumn(column, `VARCHAR(${length})`);
        return this;
    }

    number(column: string): BluePrint {
        this.addColumn(column, "INT");
        return this;
    }

    bigNumber(column: string): BluePrint {
        this.addColumn(column, "BIGINT");
        return this;
    }

    boolean(column: string): BluePrint {
        this.addColumn(column, "TINYINT(1)");
        return this;
    }

    double(column: string, precision: number = 10, scale: number = 2): BluePrint {
        this.addColumn(column, `DOUBLE(${precision},${scale})`);
        return this;
    }

    decimal(column: string, precision: number = 10, scale: number = 2): BluePrint {
        this.addColumn(column, `DECIMAL(${precision},${scale})`);
        return this;
    }

    json(column: string): BluePrint {
        this.addColumn(column, "JSON");
        return this;
    }

    text(column: string): BluePrint {
        this.addColumn(column, "TEXT");
        return this;
    }

    longtext(column: string): BluePrint {
        this.addColumn(column, "LONGTEXT");
        return this;
    }

    id(): BluePrint {
        this.addColumn("id", "INT");
        this.modifyLastColumn("AUTO_INCREMENT PRIMARY KEY");
        return this;
    }

    foreignId(column: string, references: string, onTable: string): BluePrint {
        this.addColumn(column, "INT");
        this.foreign_keys.push(`FOREIGN KEY (\`${column}\`) REFERENCES \`${onTable}\`(\`${references}\`)`);
        return this;
    }

    foreignKey(column: string, references: string, onTable: string, onDelete: string = "CASCADE", onUpdate: string = "CASCADE"): BluePrint {
        this.addColumn(column, "INT");
        this.foreign_keys.push(
            `FOREIGN KEY (\`${column}\`) REFERENCES \`${onTable}\`(\`${references}\`) ON DELETE ${onDelete} ON UPDATE ${onUpdate}`
        );
        return this;
    }

    time(column: string): BluePrint {
        this.addColumn(column, "TIME");
        return this;
    }

    date(column: string): BluePrint {
        this.addColumn(column, "DATE");
        return this;
    }

    datetime(column: string): BluePrint {
        this.addColumn(column, "DATETIME");
        return this;
    }

    timestamps(): BluePrint {
        this.addColumn("createdAt", "TIMESTAMP");
        this.modifyLastColumn("DEFAULT CURRENT_TIMESTAMP");
        this.addColumn("updatedAt", "TIMESTAMP");
        this.modifyLastColumn("DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        return this;
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
        this.drop_columns.push("id");
    }

    getSchema(tableName: string): string {
        let schema = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (\n  ${this.columns
            .map(col => `\`${col.name}\` ${col.type} ${col.constraints.join(" ")}`.trim())
            .join(",\n  ")}`;

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
