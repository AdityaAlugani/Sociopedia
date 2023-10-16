import { useState } from "react";
import {Box,
Button,TextField,useMediaQuery,Typography,useTheme} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/flexbetween";
import { Palette } from "@mui/icons-material";


const registerSchema=yup.object().shape({
    firstname:yup.string().required("required"),
    lastname:yup.string().required("required"),
    gmail:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
    location:yup.string().required("required"),
    occupation:yup.string().required("required"),
    picture:yup.string().required("required"),
})

const loginSchema=yup.object().shape({
    gmail:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
})

const initialValuesRegister={
    firstname:"",
    lastname:"",
    gmail:"",
    password:"",
    location:"",
    occupation:"",
    picture:"",
}
const initialValuesLogin={
    gmail:"",
    password:"",
}

const Form=()=>{
    const [pageType,setPageType]=useState('login');
    const theme=useTheme();
    //console.log(theme);
    const palette=theme.palette;
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const isNonMobile=useMediaQuery("(min-width:600px)");
    var isLogin=pageType==='login';
    var isRegister=pageType==='register';
    const handleLogin=async (values,formproperties)=>{
        const userinfo=await fetch("http://localhost:3001/auth/login",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({gmail:values["gmail"],password:values["password"]})
        });
        const saveduser=await userinfo.json();
        formproperties.resetForm();
        if(saveduser)
        {
            console.log(userinfo);
            dispatch(setLogin({
                user:saveduser.user,
                token:saveduser.token
            }));
            navigate('/home');
        }
    }
    const handleRegister=async (values,formproperties)=>{
        const formData=new FormData();
        for(let value in values)
        {
            formData.append(value,values[value]);
        }
        formData.append("picturepath",values.picture.name);
        const userinfo=await fetch("http://localhost:3001/auth/register",{
            method:'POST',
            body:formData
        });
        const saveduser=await userinfo.json();
        if(saveduser)
        {
            console.log(userinfo);
            setPageType('login');
            formproperties.resetForm();
        }

    }
    const handleFormSubmit=async (values,formproperties)=>{
        if(isLogin==true)
        {
            await handleLogin(values,formproperties);
        }
        if(isRegister==true)
        {
            await handleRegister(values,formproperties);
        }
    }
    return <Formik onSubmit={handleFormSubmit}
    initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
    validationSchema={isLogin ? loginSchema : registerSchema}>
        {({values,errors,touched,handleBlur,handleChange,handleSubmit,setFieldValue,resetForm})=>{
            return <form onSubmit={handleSubmit}> 
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax(0,1fr))" sx={{
                "& > div":{girdColumn:isNonMobile?undefined:"span 4"}
            }}>
                {isRegister && 
                    <>
                        <TextField label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.firstname}
                        name="firstname" error={Boolean(touched.firstname) && Boolean(errors.firstname)} helperText={Boolean(touched.firstname) && Boolean(errors.firstname)}
                        sx={{
                            gridColumn:isNonMobile ? "span 2" : undefined,
                        }}>
                        </TextField>
                        <TextField label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.lastname}
                        name="lastname" error={Boolean(touched.name) && Boolean(errors.lastname)} helperText={Boolean(touched.lastname) && Boolean(errors.lastname)}
                        sx={{
                            gridColumn:isNonMobile ? "span 2" : undefined,
                        }}>
                        </TextField>
                        <TextField label="Location" onBlur={handleBlur} onChange={handleChange} value={values.location}
                        name="location" error={Boolean(touched.location) && Boolean(errors.location)} helperText={Boolean(touched.location) && Boolean(errors.location)}
                        sx={{
                            gridColumn:isNonMobile ? "span 4" : undefined,
                        }}>
                        </TextField>
                        <TextField label="Occupation" onBlur={handleBlur} onChange={handleChange} value={values.occupation}
                        name="occupation" error={Boolean(touched.name) && Boolean(errors.occupation)} helperText={Boolean(touched.occupation) && Boolean(errors.occupation)}
                        sx={{
                            gridColumn:isNonMobile ? "span 4" : undefined,
                        }}>
                        </TextField>

                        <Box border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" gridColumn="span 4" p="1rem">
                            <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} onDrop={(acceptedfiles) => 
                            setFieldValue("picture",acceptedfiles[0])}>
                                {({getRootProps,getInputProps})=>{
                                    return (<Box {...getRootProps()} border={`2px dashed ${palette.secondary.main}`} sx={{
                                        "&:hover":{cursor:"pointer"}
                                    }}>
                                        <input {...getInputProps()}  />
                                        {!values.picture ? <p>Add picture here</p> : <FlexBetween><Typography>{values.picture.name}</Typography> <EditOutlinedIcon /> </FlexBetween> } 
                                    </Box>)
                                }}
                            </Dropzone>
                        </Box>

                        <TextField label="Gmail" onBlur={handleBlur} onChange={handleChange} value={values.gmail}
                        name="gmail" error={Boolean(touched.gmail) && Boolean(errors.gmail)} helperText={Boolean(touched.gmail) && Boolean(errors.firstname)}
                        sx={{
                            gridColumn:isNonMobile ? "span 2" : undefined,
                        }}>
                        </TextField>
                        <TextField label="Password" type="passowrd" onBlur={handleBlur} onChange={handleChange} value={values.password}
                        name="password" error={Boolean(touched.name) && Boolean(errors.password)} helperText={Boolean(touched.password) && Boolean(errors.password)}
                        sx={{
                            gridColumn:isNonMobile ? "span 2" : undefined,
                        }}></TextField>
                    </>
                }


                {isLogin && 
                    <>
                        <TextField label="Gmail" onBlur={handleBlur} onChange={handleChange} value={values.gmail}
                        name="gmail" error={Boolean(touched.gmail) && Boolean(errors.gmail)} helperText={Boolean(touched.gmail) && Boolean(errors.firstname)}
                        sx={{
                            gridColumn:isNonMobile ? "span 4" : undefined,
                        }}>
                        </TextField>
                        <TextField label="Password" type="password" onBlur={handleBlur} onChange={handleChange} value={values.password}
                        name="password" error={Boolean(touched.name) && Boolean(errors.password)} helperText={Boolean(touched.password) && Boolean(errors.password)}
                        sx={{
                            gridColumn:isNonMobile ? "span 4" : undefined,
                        }}></TextField>
                    </>
                }
                </Box>

                {/* BUTTONS */}
                <Box>
                    <Button fullWidth type="submit" sx={{m:"2rem 0",p:"1rem",backgroundColor:palette.primary.main, color:palette.background.alt,
                "&:hover":{backgroundColor:palette.primary.main}
                }}>
                        {isLogin ? "LOGIN" : "REGISTER"}    
                    </Button>
                    <Typography onClick={()=>{
                        setPageType(isLogin ? "register" : "login")
                        isLogin=false;
                        isRegister=true;
                        resetForm();
                    }}
                    sx={{
                        textDecoration:"underline",
                        color:palette.primary.main,
                        "&:hover":{
                            cursor:"pointer",
                            color:palette.primary.main
                        },
                    }}
                    >
                        {isLogin ? "Dont have an account? Register Here" : "Already have an account? Sign In here"}
                    </Typography>
                </Box>
            </form>
        }}
    </Formik>
}

export default Form;