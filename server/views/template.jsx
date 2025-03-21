//@ts-ignore
import View from "{{view}}";
//@ts-ignore
import Layout from "{{layout}}";
//@ts-ignore
import render from "reaperjs/client";
//@ts-ignore
render("root",(props)=>(<Layout><View {...props}></View></Layout>))