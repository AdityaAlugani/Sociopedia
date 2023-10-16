import { PersonAddOutlined,PersonRemoveOutlined } from "@mui/icons-material";
import { useTheme,Box,Typography,IconButton } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { setFriends } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./flexbetween";
import UserImage from "./UserImage";

const Friend=({friendId,name,subtitle,userPicturePath})=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    //window.location.reload(false);

    const {_id}=useSelector(state=>state.user);
    const token=useSelector(state=>state.token);
    const friends=useSelector((state)=>state.user.friends);

    
    const {palette}=useTheme();
    const primaryLight=palette.primary.light;
    const primaryDark=palette.primary.dark;
    const main=palette.neutral.main;
    const medium=palette.neutral.medium;

    const isFriend=friends.find((friend)=>friend===friendId) ? true : false;

    const patchfriend=async ()=>{
        const response=await fetch(`http://localhost:3001/users/${_id}/${friendId}`,{
            method:"PATCH",
            headers:{Authorization:`Bearer ${token}`,
            "Content-Type": "application/json",},
        });
        const data=await response.json();
        if(data && data.friends && data.fullfriends)
        {
            dispatch(setFriends({friends:data.friends,fullfriends:data.fullfriends}));
        }
        else
        {
            console.log("unexpected response",data);
        }
        
    }
    return <FlexBetween>
        <FlexBetween gap="1rem">
            <UserImage image={userPicturePath} size="55px" />
            <Box onClick={()=>{
                navigate(`/profile/${friendId}`);
                navigate(0);
            }} >
                <Typography color={main} variant="h5" fontWeight="500" sx={{
                    "&:hover":{color:palette.primary.light,
                    cursor:"pointer"
                    }   
                }} >
                    {name}
                </Typography>
                <Typography color={medium} fontSize="0.75rem">{subtitle}</Typography>
            </Box>
        </FlexBetween>
        {_id===friendId ? <></> : <IconButton
        onClick={()=>{
            patchfriend()
        }}

        sx={{
            backgroundColor:primaryLight,
            p:"0.6rem"
        }}>{isFriend ? <PersonRemoveOutlined sx={{color:primaryDark}} /> : <PersonAddOutlined sx={{color:primaryDark}} />}</IconButton>}
    </FlexBetween>
}

export default Friend;