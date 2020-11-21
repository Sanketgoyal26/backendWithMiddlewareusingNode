var mongoose = require("mongoose")
var User = require("../models/user")
var jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: "Unauthorized access"})
    }

    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, "harrypotter", (err, payload) => {
        if(err) {
            return res.status(401).json({error: "Unauthorized access"})
        }

        const {_id} = payload
        User.findById(_id)
        .then(userData => {
            req.user = userData
            next()
        })
        // next()
    })
}