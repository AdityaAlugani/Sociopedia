import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box,Divider,IconButton,Typography,useTheme } from "@mui/material";
import FlexBetween from "components/flexbetween";
import Friend from "components/Friend.jsx";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper.jsx";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setPost, setPosts } from "state";

const PostWidget=({
    postId,
    postUserId,
    name,
    description,
    location,
    picturepath,
    userPicturePath,
    likes,
    comments,
})=>{


    const [isComments,setIsComments]=useState(false);
    const dispatch=useDispatch();
    const token=useSelector(state=>state.token);
    const loggedInUserId=useSelector(state=>state.user._id);
    const isLiked=Boolean(likes[loggedInUserId]);
    const countlikes=Object.keys(likes).length;


    const {palette}=useTheme();
    const main=palette.neutral.main;
    const primary=palette.primary.main;

    const patchLike=async ()=>{
        console.log("here");
        const response=await fetch(`http://localhost:3001/posts/${loggedInUserId}/like`,{
            method:"PATCH",
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':"application/json"
            },
            body:JSON.stringify({postid:postId}),
        });
        const updatedPost=await response.json();
        dispatch(setPost({post:updatedPost,post_id:postId}))
    }

    return (
        <WidgetWrapper m="2rem 0rem" >
            <Friend friendId={postUserId} name={name} 
            subtitle={location} userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{
                mt:"1rem",
            }}>{description}</Typography>
            {picturepath && <img width="100%" height="auto" alt="post" style={{
                borderRadius:"0.75rem",
                marginTop:"0.75rem",
            }} src={`http://localhost:3001/assets/${picturepath}`} />}

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={()=>patchLike()}>
                            {isLiked ? (<FavoriteOutlined sx={{color:primary}} />) : (<FavoriteBorderOutlined />) }
                        </IconButton>
                        <Typography>{countlikes}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={()=>setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>

                </FlexBetween>
                <IconButton><ShareOutlined /></IconButton>
            </FlexBetween>
            {isComments && (

                <Box mt="0.5rem">
                    {comments.map((comment,i)=>(
                        <Box key={`${name}-${i}`}> 
                            <Divider />
                            <Typography sx={{color:main,m:"0.5rem",pl:"1rem",}}>{comment}</Typography> 
                            <Divider />
                        </Box>
                    ))}
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default PostWidget;  