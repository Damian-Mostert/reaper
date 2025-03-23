import query from "./query";

export default class Database<T = any> {
    private table: string;
    private queryString: string = "";
    private conditions: string[] = [];
    private values: any[] = [];
    private whereValues: any[] = [];
    private joins: string[] = [];
    private orderByClause: string = "";
    private limitClause: string = "";

    constructor(table: string) {
        this.table = table;
    }

    where(column: string, operator: string, value: any): this {
        this.conditions.push(`${column} ${operator} ?`);
        this.whereValues.push(value);
        return this;
    }

    whereIn(column: string, values: any[]): this {
        const placeholders = values.map(() => '?').join(', ');
        this.conditions.push(`${column} IN (${placeholders})`);
        this.whereValues.push(...values);
        return this;
    }

    whereNotIn(column: string, values: any[]): this {
        const placeholders = values.map(() => '?').join(', ');
        this.conditions.push(`${column} NOT IN (${placeholders})`);
        this.whereValues.push(...values);
        return this;
    }

    orderBy(column: string, direction: "ASC" | "DESC" = "ASC"): this {
        this.orderByClause = `ORDER BY ${column} ${direction}`;
        return this;
    }

    limit(count: number, offset: number = 0): this {
        this.limitClause = `LIMIT ${offset}, ${count}`;
        return this;
    }

    leftJoin(joinTable: string, localKey: string, foreignKey: string): this {
        this.joins.push(`LEFT JOIN ${joinTable} ON ${this.table}.${localKey} = ${joinTable}.${foreignKey}`);
        return this;
    }

    rightJoin(joinTable: string, localKey: string, foreignKey: string): this {
        this.joins.push(`RIGHT JOIN ${joinTable} ON ${this.table}.${localKey} = ${joinTable}.${foreignKey}`);
        return this;
    }

    innerJoin(joinTable: string, localKey: string, foreignKey: string): this {
        this.joins.push(`INNER JOIN ${joinTable} ON ${this.table}.${localKey} = ${joinTable}.${foreignKey}`);
        return this;
    }

    async min(column: string): Promise<number | null> {
        this.queryString = `SELECT MIN(${column}) AS minValue FROM ${this.table}`;
        return this.execute().then(results => results[0]?.minValue || null);
    }

    async max(column: string): Promise<number | null> {
        this.queryString = `SELECT MAX(${column}) AS maxValue FROM ${this.table}`;
        return this.execute().then(results => results[0]?.maxValue || null);
    }

    async sum(column: string): Promise<number> {
        this.queryString = `SELECT SUM(${column}) AS total FROM ${this.table}`;
        return this.execute().then(results => results[0]?.total || 0);
    }

    async avg(column: string): Promise<number> {
        this.queryString = `SELECT AVG(${column}) AS average FROM ${this.table}`;
        return this.execute().then(results => results[0]?.average || 0);
    }

    async count(): Promise<number> {
        this.queryString = `SELECT COUNT(*) AS total FROM ${this.table}`;
        return this.execute().then(results => results[0]?.total || 0);
    }

    async delete(): Promise<number> {
        this.queryString = `DELETE FROM ${this.table}`;
        return this.execute().then(results => results.affectedRows || 0);
    }

    async update(data: Record<string, any>): Promise<number> {
        const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
        this.queryString = `UPDATE ${this.table} SET ${setClause}`;
        this.values = Object.values(data);
        return this.execute().then(results => results.affectedRows || 0);
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

    async paginate(page: number = 1, perPage: number = 10): Promise<{ data: T[], total: number, page: number, perPage: number }> {
        const offset = (page - 1) * perPage;
        this.limit(perPage, offset);
        
        const data = await this.get();
        const [{ total }]:any = await query<{ total: number }[]>(`SELECT COUNT(*) as total FROM ${this.table}`);
        
        return { data, total, page, perPage };
    }

    private async execute(): Promise<any> {
        if (this.joins.length) {
            this.queryString += ` ${this.joins.join(' ')}`;
        }
        if (this.conditions.length) {
            this.queryString += ` WHERE ${this.conditions.join(' AND ')}`;
            this.values.push(...this.whereValues);
        }
        if (this.orderByClause) {
            this.queryString += ` ${this.orderByClause}`;
        }
        if (this.limitClause) {
            this.queryString += ` ${this.limitClause}`;
        }

        const result = await query<T[]>(this.queryString, this.values);

        // Reset state after execution
        this.resetState();

        return result;
    }

    private resetState(): void {
        this.queryString = "";
        this.conditions = [];
        this.values = [];
        this.whereValues = [];
        this.joins = [];
        this.orderByClause = "";
        this.limitClause = "";
    }

    async belongsTo(relatedModel: string, foreignKey: string): Promise<any> {
        return new Database(relatedModel).where('id', '=', this.values[foreignKey]).getOne();
    }

    async hasOne(relatedModel: string, foreignKey: string): Promise<any> {
        return new Database(relatedModel).where(foreignKey, '=', this.values['id']).getOne();
    }

    async hasMany(relatedModel: string, foreignKey: string): Promise<any[]> {
        return new Database(relatedModel).where(foreignKey, '=', this.values['id']).get();
    }
}
