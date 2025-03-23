import { Model } from "reaperjs";
import { userModelType } from "types/userModel";

export const userModel  = new Model<userModelType>("user",{ 
    formatOnSet(newData,oldData){
        return newData;
    },
    formatOnGet(res){
        return res
    }
});

export default userModel
