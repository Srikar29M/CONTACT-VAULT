require("dotenv").config({path:"./config/config.env"})
const express = require('express')
const morgan = require('morgan')

const connectDB = require("./config/db")

const auth = require("./middleware/auth")
// const mongoose = require('mongoose')

const app = express();

app.use(express.json())

app.use(morgan("tiny"))
app.use(require("cors")())

app.get("/protected" , auth, (req, res)=>{
    return res.status(200).json({...req.user._doc});
})


app.use("/api" , require("./routes/auth"))
app.use("/api" ,require("./routes/contact"))

// app.get("/" ,(req, res)=>{
//     res.send("hello world");
// })


const PORT = process.env.PORT || 4000
app.listen(PORT ,async()=>{
    try{
        await connectDB();
        console.log(`server listening on port: ${PORT}`);

    }catch(err){
        console.log(err)
    }
})