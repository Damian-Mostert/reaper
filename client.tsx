import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom/client";
//@ts-ignore
const props = window.reaperClientSideProps;
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'reaperjs-root': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
		}
	}
}
//@ts-ignore
import packageJson from "./package.json";

interface ErrorProps {
  message: any;
  trace?: string; // Optional trace information
}

const Error: React.FC<ErrorProps> = ({ message, trace }) => {
  return (
    <div
      style={{
        zIndex: 999,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "8px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
        color: "#fff",
        maxWidth: "500px", // Wider for better text readability
        width: "100%",
        textAlign: "center",
        padding: "20px", // Add padding for spacing
      }}
    >
      {/* Header Section */}
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-between",
          background: "#222",
          padding: "10px",
          borderRadius: "5px",
		  alignItems:"center"
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#aaa",
            marginBottom: "0",
          }}
        >
          Reaper.js ({packageJson.version})
        </div>
        <span style={{ color: "#ff5c5c" }}>⚠️ Error</span>
      </div>

      {/* Error Message */}
      <div
        style={{
          fontSize: "16px",
          lineHeight: "1.5",
          marginBottom: "15px",
          maxWidth: "400px",
          margin: "0 auto",
          paddingBottom: "1rem",
        }}
      >
        Something went wrong: {message}
      </div>

      {/* Optional Trace Section */}
      {trace && (
        <div
          style={{
            background: "#333",
            color: "#eee",
            padding: "10px",
            borderRadius: "8px",
            maxHeight: "200px",
            overflowY: "auto",
            fontFamily: "monospace",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          <strong>Trace:</strong>
          <pre>{trace}</pre>
        </div>
      )}

      {/* Reload Button */}
      <button
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: "#ff5c5c",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#e04e4e";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ff5c5c";
        }}
      >
        Reload Page
      </button>
    </div>
  );
};


interface State {
	hasError: boolean;
	errorMessage: string;
	errorStack: string;
  }
  
  class ErrorBoundary extends React.Component<any, State> {
	state = {
	  hasError: window.errorState?.hasError || false,
	  errorMessage: window.errorState?.errorMessage || '',
	  errorStack: window.errorState?.errorStack || '',
	};
  
	static getDerivedStateFromError(error: any) {
	  return { hasError: true };
	}
  
	componentDidCatch(error: any, errorInfo: any) {
	  console.error("Error captured by Error Boundary:", error, errorInfo);
  
	  const errorData = {
		hasError: true,
		errorMessage: error.message,
		errorStack: error.stack || "No stack trace available.",
	  };
  
	  // Cache the error globally
	  window.errorState = errorData;
  
	  // Save to localStorage/sessionStorage if needed
	  localStorage.setItem("errorState", JSON.stringify(errorData));
  
	  this.setState(errorData);
	}
  
	render() {
	  if (this.state.hasError) {
		return <Error message={this.state.errorMessage} trace={this.state.errorStack} />;
	  }
	  return this.props.children;
	}
  }
  
  
  // Usage in your render function
  export default function render(q: string, Children: React.ComponentType) {
	const elements = document.querySelectorAll(q);
	
	elements.forEach((el) => {
	  const root = ReactDOM.createRoot(el);
	  
	  try {
		root.render(
		  <React.StrictMode>
			<ErrorBoundary>
			  <Children {...window.reaperClientSideProps} />
			</ErrorBoundary>
		  </React.StrictMode>
		);
	  } catch (error) {
		root.render(<Error message={error}/>)
	  }
	});
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

export function useApi<T, T2>(name: string,params?:any) {
	//@ts-ignore
	const api = window.reaperClientSideNames.apis.find((n: any) => n.name === name);
	if (!api) throw new Error(`Invalid API name: ${name}`);

	return {
		api,
		async call(data?: T): Promise<T2> {
			let url = new URL(parseUrl(api.url, params), window.location.origin);
			return new Promise(async (resolve, reject) => {
				try {
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
export function loadScript(name: string, callback: () => void) {
	// Remove existing script and CSS if present
	const oldScript = document.getElementById("root-script");
	if (oldScript) oldScript.remove();

	const oldStyle = document.getElementById("root-style");
	if (oldStyle) oldStyle.remove();

	// Load JavaScript
	const script = document.createElement("script");
	script.src = `/__reaper_generated/${name}View.js`;
	script.onload = callback;
	script.setAttribute("id", "root-script");
	script.onerror = () => console.error(`Failed to load script: ${script.src}`);
	document.body.appendChild(script);

	// Load CSS
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = `/__reaper_generated/${name}View.css`;
	link.setAttribute("id", "root-style");
	link.onerror = () => console.error(`Failed to load stylesheet: ${link.href}`);
	document.body.appendChild(link);
}
export function applyMetadata(meta: MetaData) {
	// Update the document title
	document.title = meta.title;

	// Function to update or create a meta tag
	const updateMetaTag = (name: string, content: string) => {
		if (!content) return;
		let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
		if (!element) {
			element = document.createElement("meta");
			if (name.startsWith("og:") || name.startsWith("twitter:")) {
				element.setAttribute("property", name);
			} else {
				element.setAttribute("name", name);
			}
			document.head.appendChild(element);
		}
		element.setAttribute("content", content);
	};
    // Apply metadata
    if (meta.description) updateMetaTag("description", meta.description);
    else updateMetaTag("description", "");
    if (meta.author) updateMetaTag("author", meta.author);
    else updateMetaTag("author", ""); // Fixed "auther" typo
    if (meta.keywords) updateMetaTag("keywords", meta.keywords);
    else updateMetaTag("keywords", "");
    if (meta.ogTitle) updateMetaTag("og:title", meta.ogTitle);
    else updateMetaTag("og:title", "");
    if (meta.ogDescription) updateMetaTag("og:description", meta.ogDescription);
    else updateMetaTag("og:description", "");
    if (meta.ogImage) updateMetaTag("og:image", meta.ogImage);
    else updateMetaTag("og:image", "");
    if (meta.ogUrl) updateMetaTag("og:url", meta.ogUrl);
    else updateMetaTag("og:url", "");
    if (meta.twitterCard) updateMetaTag("twitter:card", meta.twitterCard);
    else updateMetaTag("twitter:card", "");
    if (meta.twitterTitle) updateMetaTag("twitter:title", meta.twitterTitle);
    else updateMetaTag("twitter:title", "");
    if (meta.twitterDescription) updateMetaTag("twitter:description", meta.twitterDescription);
    else updateMetaTag("twitter:description", "");
    if (meta.twitterImage) updateMetaTag("twitter:image", meta.twitterImage);
    else updateMetaTag("twitter:image", "");
	// Update favicon
	if (meta.favicon) {
		let favicon = document.querySelector("link[rel='icon']");
		if (!favicon) {
			favicon = document.createElement("link");
			favicon.setAttribute("rel", "icon");
			document.head.appendChild(favicon);
		}
		favicon.setAttribute("href", meta.favicon);
	}
}
function unapplyAllStyles() {
	// Remove all <style> elements
	document.querySelectorAll("style").forEach(style => style.remove());

	// Remove all <link rel="stylesheet"> elements
	document.querySelectorAll("link[rel='stylesheet']").forEach(link => link.remove());
}

// Usage
const parseUrl = (url: string, params: { [key: string]: string }): string => {
    return url.replace(/\[\.{3}(\w+)]|\[(\w+)]/g, (_, spreadParam, normalParam) => {
        const key = spreadParam || normalParam; // Determine whether it's a spread or normal param
        return params[key] !== undefined ? params[key] : `[${key}]`; // Replace or keep placeholder
    });
};

/* type Pages = "home-page" | "test-page";

interface HomePageInterface {params?:{[key:string]:string},data?:{
	test:"haha"
}}
interface TestPageInterface {params?:{[key:string]:string},data?:{[key:string]:any}}

// Map pages to their respective interfaces
type PageInterfaces = {
  "home-page": HomePageInterface;
  "test-page": TestPageInterface;
};
export function loadTemplateFromApi<T extends Pages>(name: T, data:PageInterfaces[T]) { */

export function loadTemplateFromApi(name: string, data:{params?:{[key:string]:string},data?:{[key:string]:any}}) {
	if(!data.params)data.params = {};
	if(!data.data)data.data = {};
	data.data.reaperTemplateBasicRequest = true;
	const api = useApi(name,data.params);
    let url = new URL(parseUrl(api.api.url, data.params), window.location.origin);
	api.call(data.data).then((res: any) => {
		unapplyAllStyles();
		window.reaperClientSideProps = res.clientSideProps;
		window.reaperClientSideNames = res.clientSideNames
		window.history.pushState({}, "", url);
		loadScript(res.script, () => {});
		applyMetadata(res.metadata);
	}).catch(e=>{
		console.error(e);
	});
}



