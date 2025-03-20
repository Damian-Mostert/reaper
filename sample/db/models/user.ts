import { Model, decrypt, encrypt } from "rprcli";
import { user } from "types/user";
export const Users  = new Model<user>("users",{ 
    formatOnSet(newData,oldData){
        if(newData.password){
            newData.password = encrypt(newData.password);
        }
        return newData;
    },
    formatOnGet(res){
        res.password = decrypt(res.password);
        return res
    }
});
