const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
      email: {
        type: String,
        required: true,
        unique: true

    },
      password: {
        type: String,
        required: true
    },
      isVerified: {
        type: Boolean,
        required: false
    },
    role: {
      type: String,
      enum: ['user','admin'],
      defalut: 'user' 
    },
    isVarified:{
      type: Boolean,
      default: false
    }
})

module.exports = mongoose.model('User',userSchema)