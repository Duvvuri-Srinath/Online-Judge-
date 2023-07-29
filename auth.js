const express = require('express') ;
const app = express() ;
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const cors  = require('cors');

const path = require('path');
const collection = require('./mongodb');

let displayError = "Invalid username or password" ;
const PORT = 8000 ;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.json({ online: 'compiler' });
});

app.post("/run", async (req, res) => {
    // const language = req.body.language;
    // const code = req.body.code;

    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        res.json({ filePath, output });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

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

// app.post('/submit',(req,res) => {

//     const data = {
//         username:req.body.username ,
//         password:req.body.password 
//     }
    
//     let validLogin = (username==="Sri" && password==="123") ;

//     // console.log(username+" "+password+" "+validLogin) ;

//     if(validLogin) {
//         const filePath = path.join(__dirname, 'home.html');
//         res.sendFile(filePath);
//     }
//     else {
//         // const filePath = path.join(__dirname, 'login.html');
//         // res.sendFile(filePath);
//         res.send(displayError) ;
//     }

//     // const filePath = path.join(__dirname, 'prob.html');
//     // res.sendFile(filePath);
// })

// app.post('/signup', async (req,res)=>{
//     const data = {
//         username:req.body.username ,
//         password:req.body.password 
//     }
//     console.log(data.username+" "+data.password) ;
//     await collection.insertMany([data]) ;

//     res.send("Success") ;
// })

const router = require('./routes') ;
app.use(router) ;

app.listen(PORT, () => {
    console.log("Server started on port "+PORT) ;
})