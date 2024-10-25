

const express = require("express")
const Task = require("../model/Task")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const User = require("../model/User")
require("dotenv").config()

exports.auth = async(req,res,next) =>{
try {
    const {token} = req.cookies;
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Token not found, Not authenticated"
        })
    }

    const jwtverify = jwt.verify(token,process.env.JWT_SECRET);
    if(!jwtverify){
        return res.status(400).json({
            success:false,
            message:"Token unauthorised"
        })
    }
    req.dataofuser = jwtverify;
    next()
    

} catch (error) {
    return res.status(400).json({
        success:false,
        message:"error",
        error:error.message
    })
}
}