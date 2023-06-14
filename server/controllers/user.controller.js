const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');


module.exports = {
    register: async (req,res) => {
        try{
            const potentialUser = await User.findOne({email:req.body.email});
            if(potentialUser){
                return res.status(400).json({
                    errors:{email:{message:'Email already exists'}}
                });
            }
            const newUser = await User.create(req.body);
            const usertoken = jwt.sign({_id:newUser._id,email:newUser.email},secret,{expiresIn:"2h"});
            res.cookie("usertoken",usertoken,{httpOnly:true}).json({
                message:"Success!",
                user:newUser
            })
        }    
        catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },
    login: async (req,res) => {
        try {
            const user = await User.findOne({email:req.body.email});
            console.log("user",user)
            if(user){
                const passwordMatch = await bcrypt.compare(req.body.password,user.password);
                if(passwordMatch){
                    const usertoken = jwt.sign({_id:user._id, email:user.email}, secret,{expiresIn:'2h'});
                    res.cookie('usertoken',usertoken,secret,{httpOnly:true}).json({
                        message:"Success!",
                        user:user
                    });
                    console.log("usertoken",usertoken)
                }
                else{
                    res.status(400).json({
                        errors:{email:{message:'Invalid login attempt'}}
                        
                    });
                    // console.log("ERROR",errors)
                }
            }
            else{
                res.status(400).json({
                    errors:{email:{message:'Invalid login attempt'}}
                });
                // console.log(">>>>>>>>>ERROR",errors)
            }
        }
        catch (err) {
            console.log("errerrerrerr",err)
            return res.status(400).json(err);
        }
    },
    logout: (req,res) => {
        res.clearCookie('usertoken');
        res.status(200).json({message:"Successfully logged out"})
    },
    getLogged: async (req,res) => {
        try {
            const user = jwt.verify(req.cookies.usertoken,secret);
            console.log(user)
            const currentUser = await User.findOne({_id:user._id});

            res.json(user);
            // res.status(200).json(user)

        }
        catch (error) {
            res.status(400).json({errors:'Failed to get logged in user'})

        }

    }
}