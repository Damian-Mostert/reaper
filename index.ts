
import { Response,Request } from "express";
import {Database, Model,Migration ,BluePrint,} from "./db";
export {Model,Database,BluePrint,Migration};
class Auth{
    private req:Request
    constructor(req:Request){
        this.req = req;
        
    }    
    async login(credentials:any){

    }
    async logout(){

    }
}
export class Seeder{
    Model:Model<{[key:string]:any}>;
    private Q:(q:Database)=>void
    constructor(table:string,query:(q:Database)=>void){
        this.Model = new Model<{[key:string]:any}>(table);
        this.Q = query;
    }
    async seed(){
        this.Q(this.Model.query())
    }
}
export class ReaperRequest{
    private req:Request
    data:any = {}
    headers = ()=>{
        this.req.headers;
    };
    cookies = ()=>{
        this.req.cookies;
    };
    user = async()=>{
        const authHeader = this.req.headers.authorization;
        return {
            id:""
        };
    };
    auth:Auth
    constructor(req:Request){
        this.auth = new Auth(req);
        this.req = req;
        if(req.method == "GET"){
            this.data=req.query;
        }
        if(req.method == "POST"){
            this.data=req.body;
        }
    }
}
type Template={
    metadata?:{
        title:string,
        description:string
    },
    props?:{
        [key:string]:any
    }
}
export class ReaperResponse{
    res:Response;
    Render:any;
    constructor(res:Response,Render:any){
        this.res = res;
        this.Render = Render;
    }
    render(template:string,data:Template){
        this.Render(template,data);
    }
    status(code:number){
        this.res.status(code);
        return this;        
    }
    text(data:string){
        this.res.send(data);
    }
    json(body:any){
        this.res.json(body);
    }
}
export type url = `/${string}`|`/`
export type AtPrefixedString = `@${string}Middleware`;
export type AtPrefixedString2 = `@${string}Controller.${string}`;
export type Middleware = (request:ReaperRequest,response:ReaperResponse,next:()=>void)=>void
export type Controller = {
    [key:string]:ReaperCallback
};
export type ReaperCallback = (request:ReaperRequest,response:ReaperResponse)=>any
export type RouteHandler = (name:string,url:string, ReaperCallback:AtPrefixedString2) => any;
export interface ReaperRoutes {
  Get: RouteHandler;
  Post: RouteHandler;
  Middleware: (url:url,handler:AtPrefixedString,input:(sub:ReaperRoutes)=>void)=>void;
  Group: (url:url,input:(sub:ReaperRoutes)=>void)=>void;
  Socket:(name:string,url:url,socket:`@${string}Socket`)=>void
}

interface Device{
    
}
interface Event<T>{
    user:any,
    device:Device,
    Data:T
}
type socketCallback<T>=(event:Event<T>)=>void;

interface EventStorage<T>{event:string,callback:T}
export class Socket<Funnle>{
    public events:EventStorage<socketCallback<Funnle>>[] = [];
    public ws:WebSocket;
    async init(){

    }
    on<T>(event:string,callback:socketCallback<Funnle>){
        this.events.push({
            event,
            callback,
        })
    }
    emit(event:any,data:Funnle){
        
    }
    emitTo(to:Device|any,event:string,data:Funnle){
        
    }
}

export const encrypt=(string:any)=>{
    return ""
}

export const decrypt=(string:any)=>{
    return ""
}
