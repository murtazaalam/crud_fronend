import React, {useState} from 'react';
import validator from "validator";
import Box from '@mui/material/Box';
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyle = makeStyles({
    root: {
        height: '100px',
        borderTop: '1px solid white',
        width: '100%',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    }
})

const Footer = () => {
    const classes = useStyle();
    const navigate = useNavigate();

    const goToSetting = () => {
        navigate("/setting");
    }

    const goToProfile = () => {
        navigate("/profile")
    }

    return (
        <div className={classes.root}>
            &copy; All rights reserved.
        </div>
    )
}

export default Footer;