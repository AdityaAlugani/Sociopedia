import { Box,useMediaQuery, } from "@mui/material";
import { useEffect,useState } from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget.jsx";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget.jsx";



const ProfilePage=()=>{
    const [user,setUser]=useState(null);
    const {userid}=useParams();
    const token=useSelector(state=>state.token);
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)");

    const getUser=async()=>{
        const response=await fetch(`http://localhost:3001/users/${userid}`,{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`},
        });
        const data=await response.json();
        setUser(data.extracteduser);
    }
    useEffect(()=>{
        getUser();
    },[])

    if(user===null)
    return null;  

    return (<Box>
        <Navbar />
        <Box
        width="100%"
        p="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
        >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <UserWidget userId={user._id} picturepath={user.picturepath} />
                <Box m="2rem 0rem" />
                <FriendListWidget userId={user._id} />
            </Box>
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens?undefined:"2rem"}>
                {console.log(user,user["picturepath"])}
                <MyPostWidget picturepath={user.picturepath} />
                <Box m="2rem 0rem" />
                <PostsWidget userId={user._id} isProfile={true}/>
            </Box>
        </Box>
    </Box>);
}

export default ProfilePage;