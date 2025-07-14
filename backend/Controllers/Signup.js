
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Models/user.js')
const signUp = async(req , res) => {
    try{
        const {firstName,lastName,email,contact,password,confirmPassword } = req.body;
        let user  = await User.findOne({email});
        if(user) return res.status(400).json({message:"User already exists"});
        if(password !== confirmPassword)  return res.status(400).json({message:"Passwords do not match"});
        const hashedPassword = await bcrypt.hash(password,10);
        user = new User({
            firstName,
            lastName,
            email,
            contact,
            password: hashedPassword,
            confirmPassword: hashedPassword, 
        })
        await user.save();

        return res.status(200).json({message:"User registered successfully"});
    }catch(error){
        console.error(`ERROR: ${error.message}`);
        return res.status(500).json({message:"Internal server error"});
    }
}
const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"User not found"});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const token = jwt.sign({id:user._id } , process.env.JWT_SECRET, {expiresIn:'1h'});
        return res.status(200).json({token, user:{id:user._id, firstName:user.firstName, lastName:user.lastName, email:user.email}});
    }catch(error){
        console.error(`ERROR: ${error.message}`);
        return res.status(500).json({message:"Internal server error"});
    }
}
module.exports = {
    signUp,
    login
}