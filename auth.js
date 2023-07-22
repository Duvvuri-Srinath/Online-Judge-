const express = require('express') ;
const app = express() ;
const path = require('path');
const collection = require('./mongodb');

let displayError = "Invalid username or password" ;
const PORT = 8000 ;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(express.static("public"));

app.get('/login',(req,res)=>{
    const filePath = path.join(__dirname, 'login.html');
    res.sendFile(filePath);
}) 

app.get('/home',(req,res)=>{
    const filePath = path.join(__dirname, 'home.html');
    res.sendFile(filePath);
})

app.get('/register',(req,res)=>{
    const filePath = path.join(__dirname, 'register.html');
    res.sendFile(filePath);
})

app.get('/prob',(req,res) => {
    const filePath = path.join(__dirname, 'prob.html');
    res.sendFile(filePath);
})

app.post('/submit',(req,res) => {

    const data = {
        username:req.body.username ,
        password:req.body.password 
    }
    
    let validLogin = (username==="Sri" && password==="123") ;

    // console.log(username+" "+password+" "+validLogin) ;

    if(validLogin) {
        const filePath = path.join(__dirname, 'home.html');
        res.sendFile(filePath);
    }
    else {
        // const filePath = path.join(__dirname, 'login.html');
        // res.sendFile(filePath);
        res.send(displayError) ;
    }

    // const filePath = path.join(__dirname, 'prob.html');
    // res.sendFile(filePath);
})

app.post('/signup', async (req,res)=>{
    const data = {
        username:req.body.username ,
        password:req.body.password 
    }
    console.log(data.username+" "+data.password) ;
    await collection.insertMany([data]) ;

    res.send("Success") ;
})

app.listen(PORT, () => {
    console.log("Server started on port "+PORT) ;
})