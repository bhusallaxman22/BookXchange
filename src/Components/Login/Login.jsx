import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { AccountCircle, Lock } from '@material-ui/icons/';
import { Button, Box, Typography, IconButton, Container } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AppBarred from '../AppBar/AppBarred';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
                    justify="center"
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
                                            >
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