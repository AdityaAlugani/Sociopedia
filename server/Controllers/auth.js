import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';

export const register=async (req,res)=>{
    try
    {
        const {firstname,lastname,gmail,password,picturepath,friends,location,occupation}=req.body;
        const salt=await bcrypt.genSalt();
        const hashpassword=await bcrypt.hash(password,salt);
        const newuser=new User({
            firstname,
            lastname,
            gmail,
            password:hashpassword,
            picturepath,
            friends,
            location,
            occupation,
            viewedprofile:Math.floor(Math.random()*1000),
            impressions:Math.floor(Math.random()*1000)
        });
        const returned_user=await newuser.save();
        //console.log(returned_user);
        res.status(201).json(returned_user);
    }
    catch(error)
    {
        res.status(500).json({Error:error.message});
    }
}
export const login=async (req,res)=>{
    try{
        const {gmail,password}=req.body;
        const user=await User.findOne({gmail:gmail});
        if(!user)
        {
            console.log("here");
            return res.status(404).json({"message":"User not found"});
        }
        console.log(user);
        const Userlogin=await bcrypt.compare(password,user.password);
        console.log(Userlogin);
        if(Userlogin)
        {
            const jwt_token=jwt.sign({"id":user._id},process.env.JWT_SECRET);
            console.log(jwt_token);
            res.status(200).json({token:jwt_token,user});
        }
        else
        {
            res.status(401).json({"message":"authentication error"});
        }
    }
    catch(error)
    {
        console.log("Here");
        res.status(500).json({"error":error.message});
    }
}
