import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    "firstname":{
        type:String,
        required:true,
        max:50,
        min:2
    },
    "lastname":{
        type:String,
        required:true,
        max:50,
        min:2
    },
    "gmail":{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    "password":{
        type:String,
        require:true,
        select:true,
        max:50,
    },
    "picturepath":{
        type:String,
        default:""
    },
    "friends":{
        type:Array,
        default:[]
    },
    "location":{
        type:String
    },
    "occupation":{
        type:String
    },
    "viewedprofile":{
        type:Number
    },
    "impressions":{
        type:Number
    }
},{timestamps:true});

const User=mongoose.model("User",UserSchema);
export {User};