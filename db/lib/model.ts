import BluePrint from "./bluePrint";
import Database from "./database";

export interface ModelSchema {
    up:(bluePrint:BluePrint)=>void,
    down:(bluePrint:BluePrint)=>void
}
export interface ModelConfig<Type>{
    formatOnSet?:(newData:Type,oldData:Type)=>Type;
    formatOnGet?:(res:Type)=>Type;
}
export class Model<Type> {
    public table: string;
    constructor(table: string,config?:ModelConfig<Type>) {
        this.table = table;
    }
    query(): Database<Type> {
        return new Database<Type>(this.table);
    }
}
