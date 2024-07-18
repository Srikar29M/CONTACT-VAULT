const mongoose = require("mongoose");



const connectDB = async()=>{
    return mongoose.connect(process.env.MONGODB_URL)
          .then(()=>console.log(`connection to db is established..`))
          .catch((err)=>console.log(err))


};

module.exports = connectDB;
