import {Model} from "../lib/model";
const authTokens = new Model<{
    id:number,
    userId:number,
    token:string,
    createdAt:string,
    updatedAt:string
}>("auth-tokens");
export {authTokens};