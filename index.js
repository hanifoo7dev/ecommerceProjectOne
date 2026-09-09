require('node:dns').setServers(['1.1.1.1','8.8.8.8'])
require('dotenv').config()
const express = require ('express')
const app = express()
const router = express.Router()
const authRouter = require('./routes/authRouter')
const mongodbConfig = require('./config/mongodbConfig')

app.use(express.json())
mongodbConfig()

app.use('/api/v1/auth', authRouter)

const port= process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
    
})