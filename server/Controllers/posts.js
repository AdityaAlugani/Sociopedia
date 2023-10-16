import Post from '../models/Post.js';
import { User } from '../models/User.js';

export const createPost=async (req,res)=>{
    console.log(req.body);
    const {userid,description,picturepath}=req.body;
    const usertopost=await User.findById(userid);
    const newpost=new Post({
        userId:userid,
        firstname:usertopost.firstname,
        lastname:usertopost.lastname,
        location:usertopost.location,
        description:description,
        picturepath:picturepath,
        userpicturepath:usertopost.picturepath,
        likes:{},
        comments:[]
    });
    const new_post=await newpost.save();
    res.status(201).json(new_post);
}

export const getfeedposts=async (req,res)=>{
    try
    {
        const posts=await Post.find();
        return res.status(200).json(posts);
    }
    catch(error)
    {
        return res.status(500).json({"message":error.message});
    }
}
export const getuserposts=async (req,res)=>{
    try
    {
        const {userid}=req.params;
        const posts=await Post.find({userId:userid});
        return res.status(200).json({posts});
    }
    catch(error)
    {
        return res.status(500).json({"message":error.message});
    }
}
export const likepost=async (req,res)=>{
    try
    {
        const {userid}=req.params;
        const {postid}=req.body;
        //console.log(userid,postid);
        const post=await Post.findById(postid);
        //console.log(post);
        const liked=post.likes.has(userid);
        //console.log(liked);
        if(liked)
        {
            try{
            post.likes.delete(userid);
            }
            catch(error)
            {
                console.log("1 block");
            }
        }
        else
        {
            try{
            post.likes.set(userid,true);
            }
            catch(error)
            {
                console.log("2 block");
            }
        }
        await post.save();
        const updatedpost=await Post.findById(postid);
        return res.status(200).json(updatedpost);
    }
    catch(error)
    {
        return res.status(500).json({"message":error.message});
    }
}