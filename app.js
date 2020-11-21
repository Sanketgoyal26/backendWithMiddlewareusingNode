var express = require('express')
var bodyParser = require("body-parser")
var api = require('./Routes/auth')
var mongoose = require("mongoose")
var posts = require("./Routes/post")
var cors = require('cors')

var db="mongodb://localhost/instaclone"

mongoose.connect(db, err => {
    if(err){
        console.log(err)
    }
    else{
        console.log("Database connected successfully")
    }
})

const PORT = 5000
var app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/', api)
app.use('/', posts)
app.get("/", (req, res) => {
    res.send("Hello Sanket")
})

app.listen(PORT, () => {
    console.log("Server is running at port ",PORT)
})