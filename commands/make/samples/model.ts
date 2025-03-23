import { Model } from "reaperjs";
import { {{name}}ModelType } from "types/{{name}}Model";

export const {{name}}Model  = new Model<{{name}}ModelType>("{{name}}",{ 
    formatOnSet(newData,oldData){
        return newData;
    },
    formatOnGet(res){
        return res
    }
});

export default {{name}}Model
