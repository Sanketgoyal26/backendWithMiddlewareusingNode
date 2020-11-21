var express = require("express")
var mongoose = require("mongoose")
var router=express.Router()
var User = require("../models/user")
var jwt = require("jsonwebtoken")
var requireLogin = require("../middlewares/requireLogin")

router.post("/signup", (req, res) => {
    var {name, email, password} = req.body
    
    if(name == "" || email == "" || password == ""){
        return res.status(404).json({error: "Please fill all the credentials"})
    }
    User.findOne({email: email})
    .then(result => {
        if(result){
            res.status(401).json({error: "User already exists"})
        }
        else{
            var user = new User(req.body)
            user.save()
            .then(registeredUser => {
                res.status(200).json(registeredUser)
            })
            .catch(err => {
                console.log("Something went wrong ",err)
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/signin", (req, res) => {
    var {email, password} = req.body
    if(email == "" || password == ""){
        return res.status(404).json({message: "Please fill the required credentials"})
    }

    User.findOne({email:email})
    .then(result => {
        if(result){
            if(password != result.password){
                res.status(404).json({message: "Invalid credentials"})
            }
            else {
                const token = jwt.sign({_id: result._id}, "harrypotter")
                res.json({token})
            }
        }
        else{
        res.status(404).json({message: "Invalid credentials"})
        }
    })
    .catch(err => {
        console.log(err)
    })
})

router.get("/protected", requireLogin ,(req, res) => {
    res.send("Hello I am Protected")
})

module.exports = router