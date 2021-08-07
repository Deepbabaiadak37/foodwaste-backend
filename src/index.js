const express =  require('express')
const bodyparser = require('body-parser')


const InitiateDb = require('./config/db')
const userroutes = require('./routes/userrouters')

const PORT =process.env.PORT || 3030

var app = express()
InitiateDb()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/images',express.static('uploads'))

app.get('/test',(req,res)=>{
    res.send("hellow");
})

app.use('/userroutes',userroutes)

app.listen(PORT,(req,res)=>{
    console.log(`server started at port ${PORT}`)
})
//this is test for


// for test
