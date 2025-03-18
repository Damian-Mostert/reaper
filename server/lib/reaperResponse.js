
module.exports = class ReaperResponse{
    res;
    Render;
    constructor(res,Render){
        this.res = res;
        this.Render = Render;
    }
    render(template,data){
        this.Render(template,data);
    }
    status(code){
        this.res.status(code);
        return this;        
    }
    text(data){
        this.res.send(data);
    }
    json(body){
        this.res.json(body);
    }
}