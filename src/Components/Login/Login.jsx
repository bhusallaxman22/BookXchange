import { LockOpenOutlined } from '@mui/icons-material'
import { Alert, Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export default function Login(props) {

    const paperStyle = { padding: 20, height: '70vh', width: '280px', margin: "20px auto" }
    const avatarStyle = { backgroundColor: 'green', padding: '2px', marginBottom: '8px' }
    const mainStyle = { height: "85vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }
    const textFieldMargin = { marginTop: '15px' }
    const marginHead = { marginTop: '20px' }
    const btnStyle = { margin: '8px 0', width: "100%" }
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passType,setPassType] = React.useState('password')
    const [remember, setRemember] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [user, setUser] = React.useState('')
    const [login, setLogin] = React.useState(false)
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
            await axios.post('/v1/token', {
                email: email,
                password: password
            })
                .then(res => {
                    setUser(res.data)
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
    }


    return (
        <div>
            <Grid style={mainStyle}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOpenOutlined /> </Avatar>
                        <h2 style={marginHead}>Sign In</h2>
                    </Grid>
                    <TextField style={textFieldMargin} onChange={(e)=> setEmail(e.target.value) } value={email} label="Email Address" placeholder="Enter Email Address" fullWidth required />
                    <TextField style={textFieldMargin}onChange={(e)=> setPassword(e.target.value)} value={password}  label="Password" placeholder="Enter Password" type={passType} fullWidth required />
                    <FormControlLabel style={textFieldMargin} onChange={()=>handleClickShowPassword()}  control={<Checkbox unChecked  />} label="Show Password" />
                    <FormControlLabel style={textFieldMargin} control={<Checkbox unChecked />} label="Remember Me" />
                    <Grid>
                        <Button onClick={e=>handleSubmit(e)} style={btnStyle} variant="contained"> Sign In </Button></Grid>
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
