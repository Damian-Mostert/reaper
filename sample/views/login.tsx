
import {useEffect,useState} from "react";
import render from 'rprcli/client';
import "../styles/globals.scss";

function Home(){
    const [data,setData] = useState("")
    useEffect(()=>{
        render(".test",<Test data={data}/>);
    },[data])
    return <>
    <div className=".test"></div>
    <button className="text-[1rem] cursor-pointer bg-[red]" onClick={()=>setData(data+"-test")}>
        test
    </button>
    <div className=".test"></div>
    </>
}

function Test({data}){
    return <div>{data}</div>;
}

render("root",<Home/>);
