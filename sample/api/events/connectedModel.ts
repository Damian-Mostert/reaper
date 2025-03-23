import { connectedListenerEventType } from "types/connectedListenerEvent";
import { userModelType } from "types/userModel";
import { Listener } from "reaperjs";

const connectedListener = new Listener<connectedListenerEventType,userModelType>("connected");
connectedListener.on("connected",({data,user,device})=>{    
    console.log("socket is connected")
});

export default connectedListener;