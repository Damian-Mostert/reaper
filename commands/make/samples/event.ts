import { {{name}}ListenerEventType } from "types/{{name}}ListenerEvent";
import { userModelType } from "types/userModel";
import { Listener } from "reaperjs";

const {{name}}Listener = new Listener<{{name}}ListenerEventType,userModelType>("{{name}}");
{{name}}Listener.on("connected",({data,user,device})=>{    
    console.log("socket is connected")
});

export default {{name}}Listener;