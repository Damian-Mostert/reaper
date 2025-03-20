import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom/client";
//@ts-ignore
const props = window.reaperClientSideProps;

export default function render(q:string,Children:any){
        const elements = document.querySelectorAll(q);
        elements.forEach(el=>{
        const root = ReactDOM.createRoot(el);
        root.render(<React.StrictMode>
            <Children {...props}/>
        </React.StrictMode>)
    })
}

export function useListener<socketFunnle>(name:string){
    const emit = (name:string,data:socketFunnle)=>{

    }
    const on = (name:string,c:(data:socketFunnle)=>void)=>{
        useEffect(()=>{
            
        },[]);
    }
    return {
        emit,
        on,
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
                    let url = new URL(`${window.location.protocol}${window.location.host}${api.url}`);
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
                    const res = (()=>{
                        const contentType = response.headers.get("content-type");
                        if (contentType?.includes("application/json")) {
                            return response.json();
                        } else if (contentType?.includes("text/plain")) {
                            return response.text();
                        } else if (contentType?.includes("application/octet-stream")) {
                            return response.blob(); // Handle binary data
                        } else {
                            throw new Error(`Unsupported response type: ${contentType}`);
                        }
                    })()
                    resolve(res);
                } catch (error) {
                    console.error(`Error calling API ${name}:`, error);
                    reject(error);
                }
            });
        },
    };
}

export function useNav(states: string[]) {
    const [currentState, setCurrentState] = useState(states[0]);
    return {
        state: currentState,
        set(state: number) {
            setCurrentState(states[state]);
        },
        next() {
            setCurrentState((prev) => {
                const currentIndex = states.indexOf(prev);
                const nextIndex = (currentIndex + 1) % states.length;
                return states[nextIndex];
            });
        },
        prev() {
            setCurrentState((prev) => {
                const currentIndex = states.indexOf(prev);
                const prevIndex = (currentIndex - 1 + states.length) % states.length;
                return states[prevIndex];
            });
        }
    };
}

export function loadApi<T>(name: string, data?: T) {
    //@ts-ignore
    const api = window.reaperClientSideNames.apis.find((n: any) => n.name === name);
    if (!api) throw new Error(`Invalid API name: ${name}`);

    const url = new URL(`${window.location.origin}${api.url}`);

    // Append data for GET requests
    if (api.method === "GET" && data) {
        Object.entries(data).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    // Perform full-page navigation
    if (api.method === "GET") {
        window.location.href = url.toString();
    } else if (api.method === "POST") {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = url.toString();
        form.style.display = "none";

        // Append data as hidden form fields
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = String(value);
                form.appendChild(input);
            });
        }

        document.body.appendChild(form);
        form.submit();
    } else {
        throw new Error(`Unsupported HTTP method: ${api.method}`);
    }
}
