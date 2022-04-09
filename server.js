const fs=require('fs');
const http=require('http');
const _ =require('lodash');
const server=http.createServer((req,res)=>{
    const greet=_.once(()=>{
        console.log('hello');
    })
    greet();
    greet();
    greet();
res.setHeader('Content-Type','text/html');
let path='./views/';
switch(req.url){
    case '/':
        path+='index.html';
        break;
    case '/about':
        path+='about.html';
        break;
        // Redirect
        case '/about-my':
            res.statusCode=301;
            res.setHeader('Location','./about');
            res.end();
            break;
    default:
        path+='404.html';
        break;
}
fs.readFile(path,(err,data)=>{
    if(err){
        console.log(err);
        res.end();
    }
    else{
        res.write(data);
        res.end();
    }
});

});

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000');
})