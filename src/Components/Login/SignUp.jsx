import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { AccountCircle, AccountBoxRounded, Lock } from '@material-ui/icons/';
import { Button, Box, Container, Typography, IconButton, FormControl } from '@material-ui/core';
import AppBarred from '../AppBar/AppBarred';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Navigation from '../Navigation/Navigation';
import { Link, useHistory } from 'react-router-dom';

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

export default function SignUp({ isLoggedin, setLogin }) {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLogin(true);
        history.push("/")
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
                            Sign Up!
                        </Typography>
                        <form onSubmit={handleSubmit} >
                            <FormControl>
                                <TextField
                                    className={classes.margin}
                                    id="input-with-icon-textfield0"
                                    label="Name"
                                    type='text'
                                    placeholder="Full Name"
                                    onChange={event => setName(event.target.value)}
                                    value={name}
                                    autoComplete="off"
                                    helperText="Enter Your Full Name"
                                    variant="outlined"
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountBoxRounded />
                                            </InputAdornment>
                                        ),
                                    }}
                                /></FormControl>
                            <FormControl>
                                <TextField
                                    className={classes.margin}
                                    id="input-with-icon-textfield"
                                    label="Email"
                                    type='email'
                                    placeholder="email"
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
                                /></FormControl>
                            <FormControl>
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
                                /></FormControl>
                            <Button type="submit" variant="contained" color="inherit">Sign Up</Button>
                        </form><br />
                        <Typography component="h3" style={{ textAlign: 'center', color: 'green' }}>
                            Alreday a Member? <Link to={"/login"}>Sign In!</Link>
                        </Typography>
                    </Container>
                </Grid>
                <Navigation />
            </Box>
        </div>
    );
}