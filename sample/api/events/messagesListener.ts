import { messageFunnle } from "@ts/messageFunnle";
import { user } from "@ts/user";
import { Listener } from "rprcli";

const messagesListener = new Listener<messageFunnle,user>("messages");
messagesListener.on("get-message",({data,user,device})=>{    
    messagesListener.emitTo(device,"message",{
        message:"test"
    });
});

export default messagesListener;