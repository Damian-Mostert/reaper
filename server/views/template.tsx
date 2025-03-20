//@ts-ignore
import View from "{{view}}";
//@ts-ignore
import Layout from "{{layout}}";
//@ts-ignore
import render from "rprcli/client";
//@ts-ignore
render("root",(props:any)=>(<Layout><View {...props}></View></Layout>))