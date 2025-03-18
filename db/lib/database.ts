import query from "./query";

export default class Database<T = any> {
    private table: string;
    private queryString: string = "";
    private conditions: string[] = [];
    private values: any[] = [];
    private whereValues: any[] = [];
    constructor(table: string) {
        this.table = table;
    }
    where(column: string, operator: string, value: any): this {
        this.conditions.push(`${column} ${operator} ?`);
        this.whereValues.push(value);
        return this;
    }
    async delete(): Promise<T[]> {
        this.queryString = `DELETE FROM ${this.table}`;
        return this.execute();
    }
    async login(): Promise<string> {
        return "";
    }
    async logout(): Promise<string> {
        return "";
    }
    async update(data: Record<string, any>): Promise<T[]> {
        const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
        this.queryString = `UPDATE ${this.table} SET ${setClause}`;
        this.values = Object.values(data);
        return this.execute();
    }
    async get(columns: string = '*'): Promise<T[]> {
        this.queryString = `SELECT ${columns} FROM ${this.table}`;
        return this.execute();
    }
    async getOne(columns: string = '*'): Promise<T | null> {
        this.queryString = `SELECT ${columns} FROM ${this.table} LIMIT 1`;
        return this.execute().then(results => results[0] || null);
    }
    async create(data: Record<string, any>): Promise<T> {
        const columns = Object.keys(data).map(key => `\`${key}\``).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        this.queryString = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`;
        this.values = Object.values(data);
        return this.execute().then(result => result[0]);
    }
    private async execute(): Promise<T[]> {
        if (this.conditions.length) {
            this.queryString += ` WHERE ${this.conditions.join(' AND ')}`;
            this.values.push(...this.whereValues);
        }
        return await query<T[]>(this.queryString, this.values);
    }
    async belongsTo(relatedModel: string, foreignKey: string): Promise<any> {
        const relatedTable = new Database(relatedModel);
        const relatedRecord = await relatedTable.where('id', '=', this.values[foreignKey]).getOne();
        return relatedRecord;
    }
    async hasOne(relatedModel: string, foreignKey: string): Promise<any> {
        const relatedTable = new Database(relatedModel);
        const relatedRecord = await relatedTable.where(foreignKey, '=', this.values['id']).getOne();
        return relatedRecord;
    }
    async hasMany(relatedModel: string, foreignKey: string): Promise<any[]> {
        const relatedTable = new Database(relatedModel);
        const relatedRecords = await relatedTable.where(foreignKey, '=', this.values['id']).get();
        return relatedRecords;
    }
}