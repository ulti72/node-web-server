 const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000 ;
 var app= express();

hbs.registerPartials(__dirname+'/views/partials') ;
app.set('view engine','hbs');

 hbs.registerHelper('getCurrentYear',()=>{
    return  new Date().getFullYear()
});
 //middlewwere
app.use((req,res,next)=>{
var now = new Date().toString();
var log=`${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
        console.log('unable to appent to server.log')
    }
});
next();
});


// app.use((req,res,next)=>{
//     res.render('maintence.hbs');
// });
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase() ;
});
 //registering the handler
 app.get('/',(req,res)=>{
   res.render('home.hbs',{
   pageTitle:'Welcome',
   welcomemsg:'Good to see you'
   });
 });
//bind app to a port

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
});

app.get('/project',(req,res)=>{
res.render('project.hbs',{
   project:'No Projects'
});
});

app.get('/bad',(req,res)=>{
    res.send({
errorMessage:'Unable to handle request'
    });
});
 app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
 });
