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

export const call = async(name:string,data:any)=>{

}
