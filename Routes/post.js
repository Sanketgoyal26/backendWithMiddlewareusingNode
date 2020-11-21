var express = require("express")
var mongoose = require("mongoose")
var router=express.Router()
var Post = require("../models/posts")
var jwt = require("jsonwebtoken")
var requireLogin = require("../middlewares/requireLogin")

router.post("/createPost", requireLogin ,(req, res) => {
    const {title, body} = req.body
    if(!title || !body){
        return res.status(422).json({message: " Please fil all the fields"})
    }

    req.user.password = undefined
    const posts = new Post({
        title,
        body,
        postedBy: req.user
    })

    posts.save()
    .then(result =>{
        res.status(200).json({post: result})
    })
    .catch( err => {
        console.log(err)
    })
})

router.get("/allPosts", (req, res) => {
    Post.find()
    .populate("postedBy" , "_id name")
    .then(result => {
        res.json({post: result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get("/myPosts", requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
    .populate("postedBy", "_id name")
    .then(result => {
        res.json({myPost: result})
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router