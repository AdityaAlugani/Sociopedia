
import { User } from "../models/User.js"

export const getUser=async (req,res)=>{
    try
    {
        const {id}=req.params;
        const extracteduser=await User.findById(id);
        if(extracteduser)
        {
            return res.status(200).json({extracteduser});
        }
        throw new Error(`No user with id ${id}`);
    }
    catch(error)
    {
        return res.status(404).json({"message":error.message});
    }
}
export const getUserFriends=async (req,res)=>{
    try
    {
        const {id}=req.params;
        const extracteduser=await User.findById(id);
        const friends=await Promise.all(extracteduser.friends.map(async id=>{
            return await User.findById(id);
        }));
        return res.status(200).json({friends:extracteduser.friends,fullfriends:friends}); 
    }
    catch(error)
    {
        return res.status(500).json({"message":error.message});
    }
}
export const addRemoveFriend=async (req,res)=>{
    try
    {
        const {id,friendid}=req.params;
        const extracteduser=await User.findById(id);
        const friend=await User.findById(friendid);
        if(extracteduser.friends.includes(friendid))
        {
            extracteduser.friends=extracteduser.friends.filter((_id)=>_id!==friendid);
            friend.friends=friend.friends.filter((_id)=>_id!==id);
        }
        else
        {
            extracteduser.friends.push(friendid);
            friend.friends.push(id);
        }
        await extracteduser.save();
        await friend.save();
        const updated_friends=await Promise.all(extracteduser.friends.map(async id=>{
            return await User.findById(id); 
        }));
        return res.status(200).json({friends:extracteduser.friends,fullfriends:updated_friends}); 
    }
    catch(error)
    {
        return res.status(500).json({"message":error.message});
    }
}