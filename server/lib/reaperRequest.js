class Auth{
    req
    constructor(req){
        this.req = req;
        
    }    
    async login(credentials){

    }
    async logout(){

    }
}

module.exports = class ReaperRequest{
    req
    data = {}
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
    auth
    params = {}
    constructor(req,params){
        this.params = params
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