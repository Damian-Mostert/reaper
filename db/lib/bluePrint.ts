export default class BluePrint {
    columns: string[] = [];
    drop_columns: string[] = [];
    drop_whole_table = false;
    default(value: any): BluePrint {
        this.columns.push(` DEFAULT ${JSON.stringify(value)}`);
        return this;
    }
    nullable(): BluePrint {
        this.columns.push(" NULL");
        return this;
    }
    string(column: string): BluePrint {
        this.columns.push(`\`${column}\` VARCHAR(255)`);
        return this;
    }
    number(column: string): BluePrint {
        this.columns.push(`\`${column}\` INT`);
        return this;
    }
    boolean(column: string): BluePrint {
        this.columns.push(`\`${column}\` TINYINT(1)`);
        return this;
    }
    double(column: string): BluePrint {
        this.columns.push(`\`${column}\` DOUBLE`);
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
    id(): void {
        this.columns.push("`id` INT AUTO_INCREMENT PRIMARY KEY");
    }
    time(column: string): void {
        this.columns.push(`\`${column}\` TIME`);
    }
    date(column: string): void {
        this.columns.push(`\`${column}\` DATE`);
    }
    timestamps(): void {
        this.columns.push("`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP");
        this.columns.push("`updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
    }
    longtext(column: string): BluePrint {
        this.columns.push(`\`${column}\` LONGTEXT`);
        return this;
    }
    dropTable(): void {
        this.drop_whole_table = true;
    }
    dropColumn(column: string): void {
        this.drop_columns.push(column);
    }
    dropTimestamps(): void {
        this.drop_columns.push("createdAt","updatedAt");
    }
    dropId(): void {
        this.drop_columns.push('id');
    }
    auth() :void{
        this.columns.push("`createdAt` ");
        this.columns.push("`updatedAt` ");        
    }
}