const express = require("express") ;
const userModel = require("./models") ;
const collection = require("./models") ;
const { default: mongoose} = require("mongoose") ;
const app = express() ;

app.post('/submit',(req,res)=> {
    let data = {
        username : req.body.username ,
        password : req.body.password
    }

    collection.findOne({username: data.username}) 
    .then((docs)=>{
        if(docs===null) {
            console.log("No such username exist. Sign Up to create a new account.") ;
            res.redirect('./home') ;
        }
        else {
            if(docs.password === data.password) {
                console.log("Logged in") ;
                res.redirect('./home') ;
            }
            else {
                console.log("Incorrect Password.") ;
                res.redirect('./login') ;
            }
        }

    })
    .catch((err)=>{
        console.log(err) ;
        console.log("Failed authentication");
        res.redirect('./login');
    })
});

app.post("/signup", async (req,res) => {

    let data = {
        username: req.body.username ,
        password: req.body.password 
    }

    console.log(data.username + " " + data.password) ;

    collection.findOne({username: data.username})
    .then((docs)=> {
        if(docs===null) {
            if(data.username.length<33 && data.username.length>4 && data.password.length<33 && data.password.length>4) {
                userModel.create(data) ;
                console.log("Account created successfully") ;
                res.redirect('./login') ;
            }
            else {
                console.log("Username and password should be between 5 and 32 characters") ;
                res.redirect('./register') ;
            }
        }
        else {
            console.log("Username already exists") ;
            res.redirect('./register') ;
        }
    })
    .catch((err) => {
        console.log("Failed authentication") ;
        console.log(err) ;
        res.redirect('./register') ;
    })
});

module.exports = app ;