const mongoose=require("mongoose") ;

require('dotenv').config() ;

const uri = process.env.uri ;

async function connect() {
    try {
        await mongoose.connect(uri) ;
        console.log("Connected to MongoDB") ;
    }
    catch(err) {
        console.log(err) ;
    }
}

connect() ;





















// mongoose.connect("mongodb+srv://sri:123@cluster0.cq8jzki.mongodb.net/signupDB",{ useNewUrlParser: true })
// .then(()=>{
//     console.log("MongoDB Connected");
// })
// .catch((err)=>{
//     console.log(err);
// });



// const collection= new mongoose.model("Collection1",LogInSchema);

// const newUser = new Collection({
//     name:"Hello",
//     password:"open"
// }) ;

// newUser.save() ;

// console.log("connection established") ; 

// // module.exports= collection 