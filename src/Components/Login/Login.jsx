import { LockOpenOutlined } from '@mui/icons-material'
import { Alert, Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
export default function Login(props) {
    const history = useHistory();
    const paperStyle = { padding: 20, height: '79vh', width: '280px', margin: "20px auto", }
    const avatarStyle = { backgroundColor: 'green', padding: '2px', marginBottom: '2' }
    const mainStyle = { height: "88vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", overFlow: "scroll" }
    const textFieldMargin = { marginTop: '15px' }
    const marginHead = { marginTop: '20px' }
    const btnStyle = { margin: '8px 0', width: "100%" }
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passType, setPassType] = React.useState('password')
    const [remember, setRemember] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [sever, setSever] = React.useState("")
    const [msg, setMsg] = React.useState()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleClickShowPassword = () => {
        setPassType(passType === 'password' ? 'text' : 'password')
    };
    const handleSubmit = async e => {
        e.preventDefault();
        async function postData() {
            await axios.post('/api/v1/token/', {
                email: email,
                password: password
            })
                .then(res => {
                    if (res.data.access) {
                        setSever("success")
                        setMsg("Login Successful")
                        setOpen(true)
                        localStorage.setItem("token", res.data.access)
                        localStorage.setItem("refresh", res.data.refresh)
                        if (remember) {
                            localStorage.setItem("email", email)
                            localStorage.setItem("password", password)
                        }
                    }
                    // send get request to /api/v1/user with bearer token
                    axios.get('/api/v1/account/profile', {
                        headers: {
                            Authorization: `Bearer ${res.data.access}`
                        }
                    })
                        .then(res => {
                            console.log(res.data)
                            if (res.status === 200) {
                                props.setUser(res.data.user)
                                localStorage.setItem("userName", res.data.firs_tname + " " + res.data.last_name)
                                props.setLogin(true)
                                history.push("/profile");
                            }
                            else {
                                setSever("error")
                                setMsg("Something went wrong")
                                setOpen(true)
                            }
                        })
                        .catch(err => {
                            setSever("error")
                            setMsg("Something went wrong")
                            setOpen(true)
                            console.log(err)
                        })
                    console.log("Response", res.data)
                    setMsg("Login Successful ")
                    setSever("success")
                })
                .catch(err => {
                    setMsg("Login Error: Internal Server Error" + err)
                    setOpen(true);
                    setSever("error")
                });
        }
        postData();
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios.get('/api/v1/account/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        props.setLogin(true)
                        props.history.push("/profile")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (localStorage.getItem("email")) {
            setEmail(localStorage.getItem("email"))
        }
        if (localStorage.getItem("password")) {
            setPassword(localStorage.getItem("password"))
        }
        if (localStorage.getItem("remember")) {
            setRemember(true)
        }
    }, [props])
    return (
        <div>
            <Grid style={mainStyle}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOpenOutlined /> </Avatar>
                        <h2 style={marginHead}>Sign In</h2>
                    </Grid>
                    <TextField style={textFieldMargin} onChange={(e) => setEmail(e.target.value)} value={email} label="Email Address" placeholder="Enter Email Address" fullWidth required />
                    <TextField style={textFieldMargin} onChange={(e) => setPassword(e.target.value)} value={password} label="Password" placeholder="Enter Password" type={passType} fullWidth required />
                    <FormControlLabel style={textFieldMargin} onChange={() => handleClickShowPassword()} control={<Checkbox unChecked />} label="Show Password" />
                    <FormControlLabel style={textFieldMargin} onChange={() => { setRemember(!remember); localStorage.setItem("remember", remember) }} control={<Checkbox unChecked />} label="Remember Me" />
                    <Grid>
                        <Button onClick={e => handleSubmit(e)} style={btnStyle} variant="contained"> Sign In </Button></Grid>
                    <Typography style={textFieldMargin}>
                        <Link href="#">Forget Password</Link>
                    </Typography>
                    <Typography style={textFieldMargin}> I have a referral.
                        <Link to={"/signup"}> <Button variant="contained">Sign Up</Button></Link>
                        {/* Add a snackbar */}
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity={sever}>
                                {msg}
                            </Alert>
                        </Snackbar>

                    </Typography>
                </Paper>
            </Grid>
        </div>
    )
}
