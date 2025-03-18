import { writeFileSync } from "fs"
import path from "path"
import logger from "rprcli/utils/logger";

export default function createTemplate(){
    logger.log("loading","making new template...");
    const sample = ({table})=>`
import "../../styles/globals.css";
import React from "react";
import { reaperFetch , reaperRender, reaperRouter } from "../ts/reaper";
reaperRender((props:any)=>{
    
    const [data,setData] = React.useState(null);  
    
    React.useEffect(()=>{
        reaperRouter.push("test")
        reaperFetch("test",{
            hello:"test"
        })
        .then(response=>setData(response))
        .catch(error=>console.error(error))
        .finally(()=>console.log("done with api call"));
    },[]);

    return <div>
        {data?.text}
        TEST 5
    </div> 
});`
    writeFileSync(path.join(__dirname,"../../../../app/templates/",`newTemplate.tsx`),sample({table:"new"}))
    logger.log("success","Done.");
}
createTemplate()