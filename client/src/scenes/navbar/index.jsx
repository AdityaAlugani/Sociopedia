import { useState } from "react";
import {
    Box,
    Icon,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    IconButton
} from "@mui/material"
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";

import { useDispatch , useSelector } from "react-redux";
import { setMode,setLogout } from "state";
import { useNavigate } from "react-router-dom";
import {FlexBetween} from "components/flexbetween";
import { fontGrid } from "@mui/material/styles/cssUtils";



const Navbar=()=>{
    const [isMobileMenuToggled,setIsMobileMenuToggle]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    var user=useSelector((state)=>{
        return state.user
    });
    //console.log(user)
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)");


    const theme=useTheme();   
    //console.log(theme);
    const neutrallight=theme.palette.neutral.light;
    const dark=theme.palette.neutral.dark;
    const background=theme.palette.background.default;
    const primarylight=theme.palette.primary.light;
    const alt=theme.palette.background.alt;
    const fullname=`${user.firstname} ${user.lastname}`;

    return (<FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
            <Typography fontWeight="bold" fontSize="clamp(1rem,2rem,2.25rem)" color="primary" onClick={()=>navigate("/home")} sx={{
                "&:hover":{
                    color:primarylight,
                    cursor:"pointer"
                }
            }}>
                Sociopedia
            </Typography>

            {isNonMobileScreens && (<FlexBetween backgroundColor={neutrallight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search />
                    </IconButton>    
            </FlexBetween>)}
        </FlexBetween>

        {/* Desktop Navigation */}
        {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
            <IconButton onClick={()=>dispatch(setMode())}>
                {theme.palette.mode==="dark"?(
                    <DarkMode sx={{fontSize:"25px"}} />
                ):(
                    <LightMode sx={{fontSize:"25px",color:dark}}></LightMode>
                )}
            </IconButton>
            <Message sx={{fontSize:"25px"}} />
            <Notifications sx={{fontSize:"25px"}} />
            <Help sx={{fontSize:"25px"}} />
            <FormControl variant="standard" value={fullname}>
                <Select value={fullname}
                sx={{
                backgroundColor:neutrallight,
                width: "150px",
                borderRadius: "0.25rem",
                p:"0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                    pr:"0.25rem",
                    width:"3rem"
                },
                "& .MuiSelect-select:focus": {
                    backgroundColor:neutrallight
                },
                }}
                input={<InputBase />}
                >
                    <MenuItem value={fullname}>
                    <Typography>{fullname}</Typography>
                    </MenuItem>
                    <MenuItem onClick={()=>dispatch(setLogout())}>Log out</MenuItem>
                </Select>
            </FormControl>
        </FlexBetween>) : 
        
        <IconButton onClick={()=>setIsMobileMenuToggle(!isMobileMenuToggled)}>
            <Menu />
        </IconButton>}

        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box 
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
            >
            {/*CLOSE BUTTON*/}
            <Box display="flex" justifyContent="flex-end" p="1rem">
                <IconButton onClick={()=>setIsMobileMenuToggle(!isMobileMenuToggled)}>
                    <Close />
                </IconButton>
            </Box>
            {/*MENU ITEMS*/}
            <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
            <IconButton sx={{fontSize:"25px"}} onClick={()=>dispatch(setMode())}>
                {theme.palette.mode==="dark"?(
                    <DarkMode sx={{fontSize:"25px"}} />
                ):(
                    <LightMode sx={{fontSize:"25px",color:"dark"}}></LightMode>
                )}
            </IconButton>
            <Message sx={{fontSize:"25px"}} />
            <Notifications sx={{fontSize:"25px"}} />
            <Help sx={{fontSize:"25px"}} />
            <FormControl variant="standard" value={fullname}>
                <Select value={fullname}
                sx={{backgroundColor:neutrallight,width:"150px",borderRadius:"0.25rem",p:"0.25rem 1rem",
                "& .MuiSvgIcon-root" : {
                    pr:"0.25rem",
                    width:"3rem"
                },
                "& .MuiSelect-select:focus" : {
                    backgroundColor:neutrallight
                }
                }}
                input={(<InputBase />)}
                >

                    <MenuItem value={fullname}>
                    <Typography>
                        {fullname}
                    </Typography>
                    </MenuItem>

                    <MenuItem onClick={()=>dispatch(setLogout())}>
                        Log out
                    </MenuItem>
                    
                </Select>
            </FormControl>
        </FlexBetween>
            </Box>
        )}
        
    </FlexBetween>)

}

export default Navbar;