const mongoose = require('mongoose')

function mongodbConfig (){ 
return mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Mongodb is connected")
}).catch((error)=>{
    console.log("Mongodb is not connected",error)
})
}

module.exports = mongodbConfig
