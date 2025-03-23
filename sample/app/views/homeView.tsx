import { useListener, useNav, loadApi } from 'reaperjs/client';
import { homeViewPropsType } from "types/homeViewProps"
import { connectedEventType } from "types/connectedEvent";

export default function Home({data}:homeViewPropsType){
    const nav = useNav(["welcome","test","done"]);

    const connectedListener = useListener<connectedEventType>("connected");
    connectedListener.on("connected",(data)=>{
        console.info("socket connected!");
    });
    

    return <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
        <img src="/reaper.webp"/>
        <div>{data}</div>
        <button onClick={()=>loadApi("home-page",{
            reloaded:true
        })}>reload</button>
        <div>
            <div style={{display:"flex"}}>
                <button onClick={()=>nav.prev()}>Prev</button>
                {nav.state}
                <button onClick={()=>nav.next()}>Next</button>
            </div>
        </div>
    </div>
}

/*    
    const TestApi = useApi<testApiDataIn,testApiDataOut>("test");
    
    const handle = async()=>{
        const response = await TestApi.call({
            message:"test"
        });
        console.log(response)
    };
        useEffect(()=>{
        handle();
    },[]);

 */
