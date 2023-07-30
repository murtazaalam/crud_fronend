import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Loader from "../../assets/loader.gif";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../redux/users/usersSlice';
import { changerPassword } from "../../redux/auth/authSlice";

const useStyle = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '80px'
    },
    buttonBox: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px'
    },
    registerButton: {
        textTransform: 'capitalize !important'
    },
    changeText: {
        marginTop: 0,
        textAlign: 'center'
    },
    deleteButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '12px',
        marginBottom: '148px',
    },
    alert: {

    }
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

let newPasswordData = {
    password: '',
    newPassword: '',
    reNewPassword: ''
}

const ChangePassword = () => {
    const classes = useStyle();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    
    const [submitData, setSubmitData] = useState(newPasswordData);
    const { isLoading } = useSelector(state => state.auth);

    const handleChange = (e) => {
        e.target.name === "old-password" && setSubmitData({...submitData, password: e.target.value});
        e.target.name === "new-password" && setSubmitData({...submitData, newPassword: e.target.value});
        e.target.name === "re-new-password" && setSubmitData({...submitData, reNewPassword: e.target.value});
    }

    const submit = () => {
        if(submitData.password === ""){
            toast.error("Please enter old password");
            return;
        }
        if(submitData.newPassword === ""){
            toast.error("Please enter new password");
            return;
        }
        if(submitData.newPassword !== submitData.reNewPassword){
            toast.error("New passwords mismatch");
            return;
        }
        else{
            let body = {
                password: submitData.password,
                newPassword: submitData.newPassword,
            }
            const res = dispatch(changerPassword(body));
            res.then((r) => {
                if(!r?.error){
                    setSubmitData({
                        password: '',
                        newPassword: '',
                        reNewPassword: ''
                    })
                    toast.success("Password changed successfully");
                }else{
                    toast.error(r.payload)
                }
            })
        }
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteAccount = () => {
        const res = dispatch(deleteUser());
        res.then((r) => {
            if(!r?.error){
                setOpen(false);
                navigate("/login");
                toast.success("Account deleted successfully");
            }else{
                toast.error(r.payload)
            }
        })
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
                    <div className="login-box" style={{paddingTop: '24px'}}>
                        <h2 className={classes.changeText}>Change Password</h2>
                        <TextField 
                            id="outlined-basic"
                            label="Old Password"
                            name="old-password"
                            variant="outlined"
                            type="password"
                            value={submitData.password}
                            className="login-email"
                            onChange={handleChange}
                        />
                        <TextField 
                            id="outlined-basic"
                            label="New Password"
                            name="new-password"
                            type="password"
                            value={submitData.newPassword}
                            variant="outlined"
                            className="login-pwd"
                            onChange={handleChange}
                        />
                        <TextField 
                            id="outlined-basic"
                            label="Re Type New Password"
                            name="re-new-password"
                            type="password"
                            variant="outlined"
                            value={submitData.reNewPassword}
                            className="login-pwd"
                            onChange={handleChange}
                        />
                        <div className={classes.buttonBox}>
                            <Button 
                                variant="contained"
                                disabled={isLoading}
                                sx={{
                                    width: '80px'
                                }}
                                onClick={submit}>
                                {isLoading ?
                                <img src={Loader} width="24"/>
                                : "Change"}
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
            <div className={classes.deleteButton}>
                <Button 
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    color="error"
                    onClick={handleOpen}>
                    Delete Account
                </Button>
            </div>
            <Footer />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                >
                <Box sx={{ ...style, width: 400 }}>
                    <div className={classes.alert}>
                        <div style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <WarningIcon 
                                color="warning"
                                fontSize="large"
                            />
                            <p style={{
                                margin: 0,
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#ed6c02'
                            }}>Are you sure ?</p>
                        </div>
                        <div style={{
                            marginTop: '24px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Button
                                variant="contained"
                                onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained" 
                                color="error"
                                onClick={deleteAccount}>
                                Yes
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ChangePassword;