import React from 'react'
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
    const emit = (name:string,data:socketFunnle)=>{

    }
    const on = (name:string,c:(data:socketFunnle)=>void)=>{
        
    }
    return {
        emit,
        on
    }
}

export const call = async(name:string,data:any)=>{

}
