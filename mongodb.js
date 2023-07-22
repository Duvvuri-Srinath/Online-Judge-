const mongoose=require("mongoose") ;

mongoose.connect("mongodb://localhost:8000/OJ_Signup")
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(()=>{
    console.log("Failed to Connect");
})

const LogInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection= new mongoose.model("Collection1",LogInSchema);

module.exports= collection 