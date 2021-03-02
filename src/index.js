const express =require('express')
const cors = require("cors")
const port=process.env.port
const app=express()
const takeBookRouters=require('./routers/take-book-routers')
const path=require('path')
const { dirname } = require('path')
const publicDir=path.join(__dirname,'../public')
require('./db/mongoose')

app.use(express.static(publicDir))
app.use(express.json())
app.use(cors())
app.use(takeBookRouters)

app.listen(port,()=>{
   console.log('yessss! we are on port',port)
})