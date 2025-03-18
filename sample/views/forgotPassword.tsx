
import {useEffect,useState} from "react";
import render from 'reaper-framework/client';
import "../styles/globals.scss";

function Home(){
    const [data,setData] = useState<string>("")
    
    useEffect(()=>{
        render("#test",<Test data={data}/>);
    },[data]);

    return <>
        <button className="text-[1rem] cursor-pointer bg-[red]" onClick={()=>setData(data+"-test")}>
            test
        </button>
        <div id="test"></div>
    </>
}

function Test({data}){
    return <div>{data}</div>;
}

render("root",<Home/>);
