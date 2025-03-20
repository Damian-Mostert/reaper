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

export function useViews() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  // Function to update the script and stylesheet
  const updateResources = (script: string) => {
    // Remove existing script and stylesheet elements
    const existingScript = document.getElementById('root-script');
    const existingStyles = document.getElementById('root-styles');

    if (existingScript) {
      existingScript.remove();
    }

    if (existingStyles) {
      existingStyles.remove();
    }

    // Create and append new script tag
    const scriptElement = document.createElement('script');
    scriptElement.id = 'root-script';
    scriptElement.src = `/${script}.js`;
    document.head.appendChild(scriptElement);

    // Create and append new stylesheet link tag
    const linkElement = document.createElement('link');
    linkElement.id = 'root-styles';
    linkElement.rel = 'stylesheet';
    linkElement.href = `/${script}.css`;
    document.head.appendChild(linkElement);
  };

  useEffect(() => {
    // Update resources when route changes
    const scriptName = currentRoute.substring(1) || 'default'; // Default to 'default' if no route
    updateResources(scriptName);

    // Optional: Listen for route changes (if using window.history or React Router)
    const onPopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [currentRoute]);

  // Method to change the route and trigger script update
  const navigate = (newRoute: string) => {
    setCurrentRoute(newRoute);
    window.history.pushState(null, '', newRoute);
  };

  return {
    currentRoute,
    navigate,
  };
}

export async function loadApi<T, T2>(name: string, data?: T): Promise<T2> {
    //@ts-ignore
    const api = window.reaperClientSideNames.apis.find((n: any) => n.name === name);
    if (!api) throw new Error(`Invalid API name: ${name}`);

    const url = new URL(`${window.location.protocol}${window.location.host}${api.url}`);
    const config: RequestInit = {
        method: api.method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Prepare the data based on HTTP method
    if (api.method === "GET" && data) {
        Object.entries(data).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    } else if (api.method === "POST" && data) {
        config.body = JSON.stringify(data);
    }

    return fetch(url.toString(), config)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error(`Error calling API ${name}:`, error);
            throw error;
        });
}
