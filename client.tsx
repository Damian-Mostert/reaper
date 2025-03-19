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

export function useApi<T, T2>(name: string) {
    //@ts-ignore
    const api = window.reaperClientSideNames.apis.find((n: any) => n.name === name);
    if (!api) throw new Error(`Invalid API name: ${name}`);

    return {
        async call(data?: T): Promise<T2> {
            return new Promise(async (resolve, reject) => {
                try {
                    let url = new URL(api.url);
                    let config: RequestInit = {
                        method: api.method,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };

                    if (api.method === "GET" && data) {
                        Object.entries(data).forEach(([key, value]) => {
                            url.searchParams.append(key, String(value));
                        });
                    } else if (api.method === "POST" && data) {
                        config.body = JSON.stringify(data);
                    }

                    const response = await fetch(url.toString(), config);

                    if (!response.ok) {
                        throw new Error(`API request failed with status: ${response.status}`);
                    }

                    const result: T2 = await response.json();
                    resolve(result);
                } catch (error) {
                    console.error(`Error calling API ${name}:`, error);
                    reject(error);
                }
            });
        },
    };
}


