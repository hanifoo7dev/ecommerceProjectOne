const express = require('express')
const _ = express.Router()
const {adminController} = require('../controllers/adminController')



_.post('/delete/vendor',adminController)




module.exports = _