import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { AccountCircle, Lock } from '@mui/icons-material/';
import { Button, Box, Typography, IconButton, Container } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AppBarred from '../AppBar/AppBarred';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {
    Link,
    useHistory
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        borderRadius: 25,
        maxWidth: 350,
        boxSizing: "border-box",
        boxShadow: "2px 2px 5px 2px"
    }
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Login({ isLoggedin, setLogin, setUser, userInfo }) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [showPassword, setshowPassword] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [sever, setSever] = React.useState("")
    const [msg, setMsg] = React.useState()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async e => {
        e.preventDefault();
        async function postData() {
            await fetch("/users/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data)
                    setOpen(true);
                    setMsg("Login Successful ")
                    setSever("success")
                })
                .catch(err => {
                    setMsg("Login Error: Internal Server Error")
                    setOpen(true);
                    setSever("error")
                });
        }
        postData();
        console.log("\n user data:", userInfo)
        if (userInfo.length) { setLogin(true); history.push("/") };
    }
    return (
        <div>
            <Box>
                <AppBarred isLoggedin={isLoggedin} />
                <Grid className="main-content"
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center" >
                    <Container className={classes.root}>
                        <Typography component="h1" color="textPrimary" style={{ textAlign: 'center' }}>
                            Sign In
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                className={classes.margin}
                                id="input-with-icon-textfield"
                                label="username"
                                type='username'
                                placeholder="username"
                                onChange={event => setEmail(event.target.value)}
                                value={email}
                                autoComplete="off"
                                helperText="Enter email address"
                                variant="outlined"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),

                                }}
                            /><br />
                            <TextField
                                className={classes.margin}
                                id="input-with-icon-textfield2"
                                label="Password"
                                placeholder="password"
                                autoComplete="false"
                                required
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                helperText="Enter your password"
                                onChange={event => setPassword(event.target.value)}
                                value={password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large">
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            /><br />
                            <Button type="submit" variant="contained" color="inherit" >Login</Button>
                        </form><br />

                        <Typography component="h3" color="error" style={{ textAlign: 'center' }}>
                            Not A member? <Link to={"/signup"}>Sign up!</Link>
                        </Typography>
                    </Container>
                </Grid>
                <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"right"}} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={sever}>
                        {msg}
                    </Alert>
                </Snackbar>
                {/* <Navigation /> */}
            </Box>
        </div>
    );
}