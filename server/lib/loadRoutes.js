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
            Get:(name,url,ReaperCallback)=>Get(name,path.join(main_url,url),ReaperCallback),
            Post:(name,url,ReaperCallback)=>Post(name,path.join(main_url,url),ReaperCallback),
            Middleware,
            Group,
        });
    }
    const Group =(main_url,input)=>{
        input({
            Get:(name,url,ReaperCallback)=>Get(name,path.join(main_url,url),ReaperCallback),
            Post:(name,url,ReaperCallback)=>Post(name,path.join(main_url,url),ReaperCallback),
            Middleware,
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
            script:name,
            clientSideProps:data.props?data.props:{},
            clientSideNames:{
                sockets:Object.keys(app.sockets),
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
    for(let url of Object.keys(middleware)){
        if(isValidUrl(req.url,url)){
            const middlewareName = middleware[url];
            app.middleware[`${middlewareName}.js`](new ReaperRequest(req),new ReaperResponse(res,renderTemplate),next)
        }
    }
    const CALLBACK = Object.keys(build).find(name=>{
        const item = build[name];        
        switch(item.method == req.method && isValidUrl(req.url,item.url)){        
            case true:
                return true;
            case false:
                return false;
        }
    });
    if(CALLBACK){
        const routstr = build[CALLBACK].callback;
        const controllerName = routstr.split("@")[1].split(".")[0];
        const controllerSubName = routstr.split("@")[1].split(".")[1];
        return app.controllers[`${controllerName}.js`][controllerSubName](new ReaperRequest(req),new ReaperResponse(res,renderTemplate))
    };
    next();
}
const isValidUrl = (url_in, base_url) => {
    if (!url_in || !base_url) return false;
    try {
        const cleanUrl = new URL(url_in, "http://localhost").pathname;
        const cleanBase = new URL(base_url, "http://localhost").pathname;
        if (cleanUrl === cleanBase) return true;
        if (base_url.endsWith("/*")) {
            const trimmedBase = cleanBase.replace(/\/\*$/, "");
            return cleanUrl.startsWith(trimmedBase);
        }
        return false;
    } catch (err) {
        return false;
    }
};
