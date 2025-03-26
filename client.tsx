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
		api,
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

export function loadTemplateFromApi(name: string, data:{params?:{[key:string]:string},request?:{[key:string]:string}}) {
	if(!data.params)data.params = {};
	if(!data.request)data.request = {};
	//@ts-ignore
	data.request.reaperTemplateBasicRequest = true;
	//@ts-ignore
	const api = useApi(name);
	console.log(data)
	let url = new URL(`${window.location.protocol}//${window.location.host}${api.api.url}`);
	api.call(data.request).then((res: any) => {
		unapplyAllStyles();
		window.history.pushState({}, "", url);
		loadScript(res.script, () => {});
		applyMetadata(res.metadata);
		console.log(res);
	}).catch(e=>{
		console.error(e);
	});
}



