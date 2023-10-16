import {Box,Typography,useTheme} from "@mui/material";
import Friend from "components/Friend.jsx";
import WidgetWrapper from "components/WidgetWrapper.jsx";
import { useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget=({userId})=>{
    const dispatch=useDispatch();
    const token=useSelector(state=>state.token);
    const fullfriends=useSelector((state)=>state.fullfriends);
    const {palette}=useTheme();


    const getFriends=async ()=>{
        const response=await fetch(`http://localhost:3001/users/${userId}/friends`,{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`}
        });

        const data=await response.json();
        console.log(data);
        dispatch(setFriends({friends:data.friends,fullfriends:data.fullfriends}));
    };

    useEffect(()=>{
        getFriends();
    },[])

    return (
        <WidgetWrapper>
            <Typography color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{mb:"1.5rem"}}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5em">
                {
                    fullfriends && fullfriends.map((friend)=>{
                        return <Friend key={friend._id} friendId={friend._id} name={`${friend.firstname} ${friend.lastname}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturepath}
                        />
                    })
                }
            </Box>
        </WidgetWrapper>
    )
}

export default FriendListWidget;