import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import {
    TextField,
    Button,
    Input,
    FormLabel
  } from "@mui/material";
import validator from "validator";
import { toast } from "react-toastify";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import getImageUrls from '../../api/upload';
import Loader from "../../assets/loader.gif";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/users/usersSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyle = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh'
    },
    buttonBox: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px'
    },
    registerButton: {
        textTransform: 'capitalize !important'
    },
    input: {
        width: '400px',
        marginBottom: '24px !important'
    },
    imageBox: {
        height: '80px',
        width: '80px',
        borderRadius: '50%'
    },
    imageAria: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    picFormLabel: {
        margin: '12px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    smallText: {
        marginTop: '-8px',
        fontSize: '11px'
    }
})

const updateData = {
    user_name: "",
    user_email: "",
    user_phone: "",
    user_profile_image: ""
}

const Profile = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);
    const [submitData, setSubmitData] = useState(updateData);
    const [isEditAllowed, setIsEditAllowed] = useState(false);
    const { 
        isLoading, 
        user } = useSelector(state => state.auth);

    useEffect(() => {
        setSubmitData({
            user_name: user?.user_name,
            user_email: user?.user_email,
            user_phone: user?.user_phone,
            user_profile_image: user?.user_profile_image
        })
    },[]);

    const handleUpload = async (e) => {
        if(e.target.files[0]?.type === "image/png" || 
            e.target.files[0]?.type === "image/jpeg"){
            if(e.target.files[0]?.size > 1049000){
                return toast.error("File must be less than 1MB");
            }
            const response = await getImageUrls({
                image: e.target.files[0],
                setLoading,
                setErrors,
            });
            setSubmitData({...submitData, user_profile_image: response?.url})
            return;
        }
        return toast.error("Invalid file type");
    }

    const handleChange = (e) => {
        console.log('handle', e.target.name, e.target.value)
        e.target.name === "name" && setSubmitData({...submitData, user_name: e.target.value});
        e.target.name === "email" && setSubmitData({...submitData, user_email: e.target.value});
        e.target.name === "phone" && setSubmitData({...submitData, user_phone: e.target.value});
    }

    const submit = () => {
        
        if(validate().isValid){
            const res = dispatch(updateUser(submitData));
            res.then((r) => {
                if(!r.error){
                    toast.success("Profile updated successfully");
                }else{
                    toast.error("Server error");
                }
            })
        }else{
            toast.error(validate().message);
        }
    }

    const validate = () => {
        let status = { isValid: true, message: ""}
        if(submitData.user_name === ""){
            status.isValid = false;
            status.message = "Please enter name";
            return status;
        }
        if(submitData.user_email === ""){
            status.isValid = false;
            status.message = "Please enter email";
            return status;
        }
        if(!validator.isEmail(submitData.user_email)){
            status.isValid = false;
            status.message = "Invalid email entered";
            return status;
        }
        if(submitData.user_phone === ""){
            status.isValid = false;
            status.message = "Please enter phone number";
            return status;
        }
        if(submitData.user_phone.length !== 10){
            status.isValid = false;
            status.message = "Invalid phone number entered";
            return status;
        }
        return status;
    }

    return (
        <>
            <Header />
            <Box
                component="form"
                sx={{'& > :not(style)': { m: 1, width: '25ch' }}}
                noValidate
                autoComplete="off"
                className={classes.root}
            >
                <div className="login-form-box">
                    <div className="login-box" 
                        style={{position: 'relative'}}>
                        <div className={classes.imageAria}>
                            <div className={classes.imageBox} style={{
                                margin: '8px 0 0 0',
                                position: 'relative',
                                marginBottom: '12px'
                            }}>
                                <label htmlFor="profile-pic" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    border: '1px solid lightgrey',
                                    borderRadius: '50%',
                                }}>
                                    {console.log(submitData)}
                                    {
                                        submitData?.user_profile_image ? 
                                        <img 
                                            src={submitData?.user_profile_image} 
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: '50%'
                                            }}
                                            />
                                        :
                                        <AccountCircleIcon 
                                            sx={{
                                                width: "80px",
                                                height: "80px"
                                            }}
                                        />
                                    }
                                    <Input
                                        id="profile-pic"
                                        name="profile-pic"
                                        disabled={loading || !isEditAllowed}
                                        type="file"
                                        accept="application/pdf"
                                        sx={{display: 'none'}}
                                        onChange={handleUpload}
                                    />
                                </label>
                            </div>
                            {isEditAllowed &&
                            <FormLabel 
                                id="demo-controlled-radio-buttons-group"
                                className={classes.picFormLabel}>
                                {loading && 
                                <img 
                                    src={Loader} 
                                    height="20" 
                                    width="20" />
                                }
                                Profile Picture
                                <small className={classes.smallText}>
                                    (.png or .jpg format)
                                </small>
                            </FormLabel>}
                        </div>
                        <TextField 
                            id="outlined-basic"
                            name="name"
                            type="text"
                            value={submitData?.user_name}
                            variant="outlined"
                            className={classes.input}
                            onChange={handleChange}
                        />
                        <TextField 
                            id="outlined-basic"
                            variant="outlined"
                            name="email"
                            type="email"
                            value={submitData?.user_email}
                            className={classes.input}
                            onChange={handleChange}
                        />
                        <TextField 
                            id="outlined-basic"
                            variant="outlined"
                            name="phone"
                            type="number"
                            value={submitData?.user_phone}
                            className={classes.input}
                            onChange={handleChange}
                        />
                        <div className={classes.buttonBox}>
                            {isEditAllowed && 
                            <Button 
                                sx={{width: '80px'}}
                                disabled={isLoading}
                                variant="contained"
                                onClick={submit}>
                                {isLoading ? 
                                <img 
                                    src={Loader} 
                                    width="24" />
                                :
                                'Update'}
                            </Button>}
                        </div>
                        <Button sx={{
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            position: 'absolute',
                            right: 0
                        }}
                        onClick={() => setIsEditAllowed(true)}>
                            Edit
                        </Button>
                    </div>
                </div>
            </Box>
            <Footer />
        </>
    )
}

export default Profile;