import {Model} from "../lib/model";
const migrations = new Model<{
    name:string,
    batch:number
}>("migrations");
export {migrations};