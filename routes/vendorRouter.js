const express = require('express')
const _ = express.Router()
const {vendorController} = require('../controllers/vendorController')



_.post('/create/product',vendorController)




module.exports = _