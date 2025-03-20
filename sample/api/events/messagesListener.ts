import { messageFunnle } from "@ts/messageFunnle";
import { Listener } from "rprcli";

const messagesListener = new Listener<messageFunnle>("messages");

messagesListener.on("get-message",(event)=>{
    const {user,device,data} = event;

    
    messagesListener.emitTo(device,"message",{
        message:"test"
    });
});

export default messagesListener;