//@ts-ignore
import View from "{{view}}";
//@ts-ignore
import Layout from "{{layout}}";
//@ts-ignore
import render from "reaperjs/client";

if(!window.reaperHasRenderedLayout){
    render("reaperjs-layout",(props)=>(<Layout {...props}></Layout>));
    window.reaperHasRenderedLayout = true;
}

const renderInterval = setInterval(()=>{
    var elm = document.querySelector("reaperjs-root");
    if(elm){
        render("reaperjs-root",(props)=>(<View {...props}/>))
        clearInterval(renderInterval);
    }
},10);