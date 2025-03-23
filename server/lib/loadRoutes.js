const path = require("path");
const ReaperRequest = require('./reaperRequest');
const ReaperResponse = require('./reaperResponse');

module.exports = (app,server)=>async function(req,res,next){
    const routes = app.routes;
    const build = {};
    const middleware = {};

    const Get = (name,url,callback)=>{
        build[name] = {
            method:"GET",
            url,
            callback
        }
    }
    const Post = (name,url,callback)=>{
        build[name] = {
            method:"POST",
            url,
            callback
        }
    }
    const Middleware =(main_url,ReaperCallback,input)=>{
        middleware[main_url] = ReaperCallback;
        input({
            Get,
            Post,
            Middleware,
            Group,
        });
    }
    const Group =(main_url,input)=>{
        input({
            Get:(name,url,ReaperCallback)=>Get(name,path.join(main_url,url),ReaperCallback),
            Post:(name,url,ReaperCallback)=>Post(name,path.join(main_url,url),ReaperCallback),
            Middleware:(s_url,ReaperCallback,input)=>Middleware(path.join(main_url,s_url),ReaperCallback,input),
            Group,
        });
    }
    routes({
        Get,
        Post,
        Middleware,
        Group,
    });

    const renderTemplate =async (name,data={})=>{
        const apis = [];
        Object.keys(build).forEach(key=>{
            apis.push({
                name:key,
                method:build[key].method,
                url:build[key].url
            })
        })
        res.render("index",{
            script:`${name}View`,
            clientSideProps:data.props?data.props:{},
            clientSideNames:{
                listeners:Object.keys(app.listeners),
                apis
            },
            metadata:{                
                title: 'Reaper website',
                description: 'A website made with the reaper framework',
                author: 'Damian Mostert',
                keywords: '',
                ogTitle: '',
                ogDescription: '',
                ogImage: '',
                ogUrl: '',
                twitterCard: '',
                twitterTitle: '',
                twitterDescription: '',
                twitterImage: '',
                favicon: '/reaper.webp',
                ...data.metadata?data.metadata:{}
            }
        });
    }
    var Params = {};

    for(let url of Object.keys(middleware)){
        const {isValid,params} = isValidUrl(req.url,`${url}/[...middlewareRoute]`);
        Params = {...Params,...params}
        if(isValid){
            const middlewareName = middleware[url];
            var allow = false;
            var next = ()=>{
                allow = true;
            }
            app.middleware[`${middlewareName}.js`](new ReaperRequest(req,params),new ReaperResponse(res,renderTemplate),next)
            if(!allow)return;
        }
    }

    const CALLBACK = Object.keys(build).find(name=>{
        const item = build[name];        
        const {isValid,params} = isValidUrl(req.url,item.url);
        Params = {...Params,...params};
        switch(item.method == req.method && isValid){        
            case true:
                return true;
            case false:
                return false;
        }
    });
    if(CALLBACK){
        const params = Params;
        const routstr = build[CALLBACK].callback;
        const controllerName = routstr.split("@")[1].split(".")[0];
        const controllerSubName = routstr.split("@")[1].split(".")[1];
        var pass = false;
        app.controllers[`${controllerName}.js`][controllerSubName](new ReaperRequest(req,params),new ReaperResponse(res,renderTemplate),()=>pass = true)
        if(!pass){
            return;
        }
    };
    next();
}
const isValidUrl = (url_in, base_url) => {
    if (!url_in || !base_url) return { isValid: false, params: {} };
    
    try {
        const cleanUrl = new URL(url_in, "http://localhost").pathname;
        const cleanBase = new URL(base_url, "http://localhost").pathname;

        // Convert paths to segments
        const urlSegments = cleanUrl.split("/").filter(Boolean);
        const baseSegments = cleanBase.split("/").filter(Boolean);

        let params = {};

        for (let i = 0; i < baseSegments.length; i++) {
            if (baseSegments[i].startsWith("[...")) {
                // Wildcard parameter - capture everything after this segment
                const paramName = baseSegments[i].slice(4, -1); // Extract parameter name
                params[paramName] = urlSegments.slice(i).join("/");
                return { isValid: true, params };
            }
            if (baseSegments[i].startsWith("[") && baseSegments[i].endsWith("]")) {
                // Single dynamic parameter - extract value
                const paramName = baseSegments[i].slice(1, -1);
                params[paramName] = urlSegments[i];
            } else if (urlSegments[i] !== baseSegments[i]) {
                return { isValid: false, params: {} };
            }
        }

        return urlSegments.length === baseSegments.length ? { isValid: true, params } : { isValid: false, params: {} };
    } catch (err) {
        return { isValid: false, params: {} };
    }
};
