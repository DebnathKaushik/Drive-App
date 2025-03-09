const mongoose = require('mongoose');



function connection(){
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log("Database Connected!");
    })
}




module.exports = connection