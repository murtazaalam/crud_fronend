import React, {useState} from 'react';
import validator from "validator";
import Box from '@mui/material/Box';
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { logout, reset } from '../../redux/auth/authSlice';
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyle = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0px 0px 25px 0px #8fa3da',
        padding: '12px 32px',
    },
    profilePic: {
        width: '60px',
        height: '60px',
        borderRadius: '50%'
    },
    button: {
        textTransform: 'capitalize !important',
        justifyContent: 'flex-start !important',
        fontWeight: 'bold !important',
    }
})

const Header = () => {
    const classes = useStyle();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const goToSetting = () => {
        navigate("/setting");
    }

    const goToProfile = () => {
        navigate("/profile");
    }

    const goToHome = () => {
        navigate("/home");
    }

    const logoutClicked = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/login");
    }

    return (
        <div className={classes.root}>
            <div>
                <img 
                    src="https://weboconnect.com/assets/images/white-logo.png" 
                    width={80} 
                    alt="logo"
                    style={{cursor: 'pointer'}}
                    onClick={goToHome}
                    />
            </div>
            <div className="profile-image">
                <Button className={classes.profilePic}>
                    <AccountCircleIcon 
                        sx={{
                            width: "60px",
                            height: "60px"
                        }}
                    />
                </Button>
                <div className="dropdown">
                    <Button 
                        className={classes.button}
                        onClick={goToProfile}>
                        {user?.user_name}
                    </Button>
                    <Button 
                        className={classes.button}
                        onClick={goToSetting}>
                        Setting
                    </Button>
                    <Button 
                        className={classes.button}
                        onClick={logoutClicked}>
                        Logout
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default Header;