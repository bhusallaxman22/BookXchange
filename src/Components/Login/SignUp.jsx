import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { AccountCircle, AccountBoxRounded, Lock, PersonOutlineOutlined } from '@material-ui/icons/';
import { Button, Box, Container, Typography, IconButton, FormControl } from '@material-ui/core';
import AppBarred from '../AppBar/AppBarred';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import Navigation from '../Navigation/Navigation';
import {
    Link,
    // useHistory
} from 'react-router-dom';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
// import gql from 'graphql-tag';
// import { useMutation } from '@apollo/react-hooks';

// const SIGN_UP = gql`
// mutation SignUp($email:String!,$password:String!,$username:String!){
// createUser(email:$email,password:$password,username:$username){
//         userInstance{
//             username
//           }
//         }
//     }
// `;
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        borderRadius: 25,
        maxWidth: 350,
        boxSizing: "border-box",
        boxShadow: "2px 2px 5px 2px"
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


export default function SignUp({ isLoggedin, setLogin }) {
    let addUser,data;
    // = useMutation(SIGN_UP);

    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setlastName] = useState('');
    // const [Res, setRes] = useState(400)
    const [password, setPassword] = useState('');
    const [firstName, setName] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    // const history = useHistory();

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    // const handleReset = () => {
    //     setActiveStep(0);
    // };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // fetch("/users/register", {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         firstName,
        //         lastName,
        //         username,
        //         password,
        //     })
        // })
        //     .then(res => console.log(res.json()))
        //     .then(data => { setRes(data); console.log(data) })
        //     .catch(err => console.log(err));
        // if (Res.status === 200) setLogin(true);
        // if (Res.status === 404) alert(Res.message);
        // if (Res.status === 500) alert(Res.message);
        addUser({ variables: { username, email, password } });
        setTimeout(async () => {
            console.log(data)
            data ? handleNext() : alert("Some error occured");
        }, 2000);
    }

    function getSteps() {
        return ['User Credentials', 'Personal Information', 'Review'];
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <form onSubmit={handleSubmit} >
                    <FormControl>
                        <TextField
                            className={classes.margin}
                            id="input-with-icon-textfield0"
                            label="firstName"
                            type='text'
                            placeholder="First Name"
                            onChange={event => setName(event.target.value)}
                            value={firstName}
                            autoComplete="off"
                            helperText="Enter Your Full Name"
                            variant="outlined"
                            // required
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
                            id="input-with-icon-textfield00"
                            label="lastName"
                            type='text'
                            placeholder="Last Name"
                            onChange={event => setlastName(event.target.value)}
                            value={lastName}
                            autoComplete="off"
                            helperText="Enter Your Full Name"
                            variant="outlined"
                            // required
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
                            label="username"
                            type='text'
                            placeholder="username"
                            onChange={event => setUsername(event.target.value)}
                            value={username}
                            autoComplete="off"
                            helperText="Enter username"
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
                            id="input-with-icon-email"
                            label="email address"
                            type='email'
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
                                        <PersonOutlineOutlined />
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
                </form>;
            case 1:
                return <div>
                    <h2>Additional User Info Goes Here.</h2>
                </div>;
            case 2:
                return <div>
                    <h2>Review and Submit Section</h2>
                </div>;
            default:
                return 'Unknown stepIndex';
        }
    }
    return < div >
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
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>User Account Created Successfully <Link to={'/login'}>Sign In</Link> </Typography>
                            </div>
                        ) : (
                                <div>
                                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                        >
                                            Back
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                    </div>
                    <br />
                    <Typography component="h3" style={{ textAlign: 'center', color: 'green' }}>
                        Alreday a Member? <Link to={"/login"}>Sign In!</Link>
                    </Typography>
                </Container>
            </Grid>
        </Box>
    </div >;

}