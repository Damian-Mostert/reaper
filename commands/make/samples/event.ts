import { {{name}}EventType } from "types/{{name}}Event";
import { userModelType } from "types/userModel";
import { Listener } from "reaperjs";

const {{name}}Listener = new Listener<{{name}}EventType,userModelType>("{{name}}");
{{name}}Listener.on("connected",({data,user,device})=>{    
    console.log("socket is connected")
});

export default {{name}}Listener;