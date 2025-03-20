import "../styles/globals.scss";
//react
import { useEffect } from "react";
//reaper
import render, { useListener, useApi, useNav, loadApi } from 'rprcli/client';
//types
import { messageFunnle } from "@ts/messageFunnle";
import { testApiDataOut,testApiDataIn } from "@ts/testApiData";
import { HomePageProps } from "@ts/homePageProps";

//root
render("root",function Home(props:HomePageProps){
    //app
    const nav = useNav(["welcome","test","done"]);
    //socket
    const messagesListener = useListener<messageFunnle>("messages");
    messagesListener.on("message",(data)=>{
        alert(data.message);
    });

    //apis
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

    return <>
        <button onClick={()=>nav.prev()}>Prev</button>
        <button onClick={()=>nav.next()}>Next</button>
        <button onClick={()=>loadApi("home-page",{})}></button>
        {nav.state}
    </>
});