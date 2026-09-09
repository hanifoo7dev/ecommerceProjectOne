const express = require('express')
const _ = express.Router()
const {registrationController,loginController,verifyEmailController} = require('../controllers/authController')



_.post('/registration',registrationController)
_.post('/login',loginController)
_.post('/verify/:token',verifyEmailController)



module.exports = _