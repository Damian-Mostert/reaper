//react
import { useEffect } from "react";
//reaper
import { useListener, useApi, useNav, loadApi } from '@reaper/client';
//types
import { messageFunnle } from "@ts/messageFunnle";
import { testApiDataOut,testApiDataIn } from "@ts/testApiData";
import { HomePageProps } from "@ts/homePageProps";

export default function Home({data}:HomePageProps){
    const nav = useNav(["welcome","test","done"]);
    const messagesListener = useListener<messageFunnle>("messages");
    const TestApi = useApi<testApiDataIn,testApiDataOut>("test");
    
    const handle = async()=>{
        const response = await TestApi.call({
            message:"test"
        });
        console.log(response)
    };

    messagesListener.on("message",(data)=>{
        alert(data.message);
    });
    
    useEffect(()=>{
        handle();
    },[]);

    return <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
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