import React, { useState } from 'react'
import ReactDOM from "react-dom/client";

export default function render(q:string,children:any){
        const elements = document.querySelectorAll(q);
        elements.forEach(el=>{
        console.log("rendering",el)
        const root = ReactDOM.createRoot(el);
        //@ts-ignore
        root.render(<React.StrictMode>
            {children}
        </React.StrictMode>)
    })
}

export function useSocket<socketFunnle>(name:string){
    const [events,setEvents] = useState<{name:string,callback:(data:socketFunnle)=>void}[]>([]);
    const emit = (name:string,data:socketFunnle)=>{

    }
    const on = (name:string,c:(data:socketFunnle)=>void)=>{
        setEvents((old)=>{
            return [...old,{
                name,callback:c
            }]
        })
    }
    const clear = () =>{
        setEvents([]);
    }
    return {
        emit,
        on,
        clear
    }
}

export function useApi<T,T2>(name:string){
    return {
        async call(data:T):Promise<T2>{
            const res:any= {};
            return res;
        }
    }
}

