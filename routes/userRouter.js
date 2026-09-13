const express = require('express')
const _ = express.Router()
const {userController} = require('../controllers/userController')



_.get('/user/product',userController)




module.exports = _