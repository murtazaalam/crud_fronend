import React, {useState} from 'react';
import validator from "validator";
import Box from '@mui/material/Box';
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { login } from "../../redux/auth/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../assets/loader.gif";


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
    }
})

let loginData = {
    email: '',
    password: ''
}

const Login = () => {
    const classes = useStyle();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShowPassword, setIsShowPassword] = useState(false);
    
    const [submitData, setSubmitData] = useState(loginData);

    const { isLoading } = useSelector(state => state.auth);

    const handleChange = (e) => {
        e.target.name === "email" && setSubmitData({...submitData, email: e.target.value});
        e.target.name === "password" && setSubmitData({...submitData, password: e.target.value});
    }

    const submit = () => {
        if(submitData.email === ""){
            toast.error("Please enter email");
            return;
        }
        if(!validator.isEmail(submitData.email)){
            toast.error("Invalid email entered");
            return;
        }
        if(submitData.password === ""){
            toast.error("Please enter password");
            return;
        }
        else{
            const res = dispatch(login(submitData));
            res.then(r => {
                if(!r.error){
                    toast.success("Login Success");
                    navigate("/home");
                }else{
                    toast.error("Incorrect Email Or Password")
                }
            })
        }
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
                <div className="login-box" style={{paddingTop: '24px'}}>
                    <h1 style={{
                        textAlign: 'center',
                        marginTop: 0}}>Login</h1>
                    <TextField 
                        id="outlined-basic"
                        label="Email"
                        name="email"
                        variant="outlined"
                        type="email"
                        className="login-email"
                        onChange={handleChange}
                    />
                    <div style={{
                        position: "relative",
                    }}>
                        <TextField 
                            id="outlined-basic"
                            label="Password"
                            name="password"
                            type={isShowPassword ? "text" : "password"}
                            variant="outlined"
                            className="login-pwd"
                            onChange={handleChange}
                        />
                        {!isShowPassword ?
                            <Visibility 
                                onClick={() => setIsShowPassword(true)}
                                fontSize='large'
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 28
                                }}
                            />
                            :
                            <VisibilityOff 
                                onClick={() => setIsShowPassword(false)}
                                fontSize='large'
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 28
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
                                width: '80px'
                            }}>
                            {isLoading ?
                                <img src={Loader} width="24"/>
                            : "Login"}
                        </Button>
                        <Button 
                            variant="text" 
                            className={classes.registerButton}
                            onClick={() => navigate("/signup")}>
                            Register here
                        </Button>
                    </div>
                </div>
            </div>
      </Box>
    )
}

export default Login;