import { Box,Typography,useTheme,useMediaQuery } from "@mui/material";
import Form from "./Form.jsx";      

export const LoginPage=()=>{
    const theme=useTheme();
    const NonMobileScreens=useMediaQuery("(min-width:1000px)");
    return <Box>
        <Box width="100%" p="1rem 6%" backgroundColor={theme.palette.background.alt} textAlign="center">
            <Typography
            color="primary" fontWeight="bold" fontSize="32px">
                Sociopedia
            </Typography>
        </Box>
        <Box width={NonMobileScreens ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}
        >
            <Typography fontWeight="500" variant="h5" sx={{mb:"1.5rem"}}>Welcome to Sociopedia, The social for sociopaths</Typography>
            {/* FORM */}
            <Form />
        </Box>
    </Box>
}

export default LoginPage;   