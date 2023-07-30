import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import {
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel
  } from "@mui/material";
import validator from "validator";
import { toast } from "react-toastify";
import Loader from "../../assets/loader.gif";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/auth/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
var paswd =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

const useStyle = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
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

const registerData = {
    user_email: "",
    user_name: "",
    user_phone: "",
    user_password: "",
    user_gender: ""
}

const Signup = () => {
    const classes = useStyle();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [submitData, setSubmitData] = useState(registerData);
    const { isLoading } = useSelector(state => state.auth);

    const handleChange = (e) => {
        e.target.name === "name" && setSubmitData({...submitData, user_name: e.target.value});
        e.target.name === "email" && setSubmitData({...submitData, user_email: e.target.value});
        e.target.name === "phone" && setSubmitData({...submitData, user_phone: e.target.value});
        e.target.name === "gender" && setSubmitData({...submitData, user_gender: e.target.value});
        e.target.name === "password" && setSubmitData({...submitData, user_password: e.target.value});
    }

    const submit = () => {
        if(validate().isValid){
            const res = dispatch(signup(submitData));
            res.then((r) => {
                if(!r.error){
                    toast.success("User Registered Successfully");
                    setSubmitData({
                        ...submitData,
                        user_email: "",
                        user_name: "",
                        user_phone: "",
                        user_password: "",
                        user_gender: ""
                    })
                }else{
                    toast.error(r.payload);
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
        if(submitData.user_gender === ""){
            status.isValid = false;
            status.message = "Choose your gender";
            return status;
        }
        if(submitData.user_password === ""){
            status.isValid = false;
            status.message = "Please enter password";
            return status;
        }
        if(submitData.user_password.length < 6){
            status.isValid = false;
            status.message = "Password must be greater than 6 character";
            return status;
        }
        if(!submitData.user_password.match(paswd)){
            status.isValid = false;
            status.message = "Password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character";
            return status;
        }
        return status;
    }

    return (
        <Box
            component="form"
            sx={{'& > :not(style)': { m: 1, width: '25ch' }}}
            noValidate
            autoComplete="off"
            className={classes.root}
        >
            <div className="login-form-box">
                <img 
                    src="https://weboconnect.com/assets/images/white-logo.png" 
                    width={150} 
                    alt="logo"/>
                <div className="login-box">
                    <h1 style={{textAlign: 'center'}}>Sign Up</h1>
                    <TextField 
                        id="outlined-basic"
                        label="Name"
                        name="name"
                        type="text"
                        value={submitData.user_name}
                        variant="outlined"
                        className={classes.input}
                        onChange={handleChange}
                    />
                    <TextField 
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={submitData.user_email}
                        className={classes.input}
                        onChange={handleChange}
                    />
                    <TextField 
                        id="outlined-basic"
                        label="Phone Number"
                        variant="outlined"
                        name="phone"
                        type="number"
                        value={submitData.user_phone}
                        className={classes.input}
                        onChange={handleChange}
                    />
                    <FormControl sx={{marginBottom: '16px'}}>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            Gender
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="gender"
                            value={submitData.user_gender}
                            onChange={handleChange}>
                            <FormControlLabel 
                                value="FEMALE" 
                                control={<Radio />} 
                                label="Female" />
                            <FormControlLabel 
                                value="MALE" 
                                control={<Radio />} 
                                label="Male" />
                            <FormControlLabel 
                                value="OTHER" 
                                control={<Radio />} 
                                label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <div style={{
                        position: 'relative',
                    }}>
                        <TextField 
                            id="outlined-basic"
                            label="Password"
                            name="password"
                            type={isShowPassword ? "text" : "password"}
                            value={submitData.user_password}
                            variant="outlined"
                            className={classes.input}
                            onChange={handleChange}
                        />
                        {!isShowPassword ?
                            <Visibility 
                                onClick={() => setIsShowPassword(true)}
                                fontSize='large'
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 12
                                }}
                            />
                            :
                            <VisibilityOff 
                                onClick={() => setIsShowPassword(false)}
                                fontSize='large'
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 12
                                }}
                            />
                        }
                    </div>
                    <div className={classes.buttonBox}>
                        <Button 
                            variant="contained"
                            disabled={isLoading}
                            onClick={submit}
                            sx={{
                                width: '100px'
                            }}>
                            {isLoading ?
                                <img src={Loader} width="24"/>
                            : "Register"}
                        </Button>
                        <Button 
                            variant="text" 
                            className={classes.registerButton}
                            onClick={() => navigate("/login")}>
                            Already have an account
                        </Button>
                    </div>
                </div>
            </div>
      </Box>
    )
}

export default Signup;