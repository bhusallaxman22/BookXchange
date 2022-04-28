import { AccountBoxOutlined } from '@mui/icons-material'
import { Alert, Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import emails from "./emails"
import axios from 'axios'

function SignUp() {
    const [isInvited, setInvited] = React.useState(true)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const paperStyle = { padding: 20, height: '80vh', overFlow:"scroll", width: '280px', margin: "20px auto" }
    const avatarStyle = { backgroundColor: 'green', padding: '2px', marginBottom: '8px' }
    const textFieldMargin = { marginTop: '10px' }
    const mainStyle= { height: "85vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", overFlow:"scroll" }
    const marginHead = { marginTop: '10px' }
    const notInvited = { color: "red", fontSize: "12px" }
    const btnStyle = { margin: '8px 0', width: "100%" }
    const [open, setOpen] = React.useState(false)
    const [sever, setSever] = React.useState("")
    const [msg, setMsg] = React.useState()
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    function checkInvited(e) {
        e.preventDefault();
        //         console.log(email)
        //         if(emails.filter(ea => ea.emailAddress.toLowerCase() === email.toLowerCase()).length > 0 ){
        //             setInvited(true)
        //         }
        //         else{
        //             setInvited(false)
        //         }
        // console.log(emails.filter(email => email === email.emailAddress))
    }
    function handleSubmit(e) {
        e.preventDefault();
        async function postData() {
            await axios.post('/api/v1/account/register', {
                email: email,
                password: password,
                password2: password
            })
                .then(res => {
                    setMsg("Register Successful ")
                    setSever("success")

                    console.log(res)
                })
                .catch(err => {
                    setMsg("Register Error: Internal Server Error")
                    setSever("error")
                    console.log(err)
                });
        }
        postData();
    }

    return (
        <Grid style={mainStyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><AccountBoxOutlined /> </Avatar>
                    <h2 style={marginHead}>Sign Up</h2>
                </Grid>
                <TextField style={textFieldMargin} label="Email Address" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email Address" fullWidth required />
                {isInvited === true ? <div>
                    <TextField style={textFieldMargin} label="Full Name" placeholder="Enter Full Name" fullWidth required />
                    <TextField style={textFieldMargin} label="Phone" placeholder="Phone Number" fullWidth required />
                    <TextField style={textFieldMargin} value={password} onChange={e=>setPassword(e.target.value)} label="Password" placeholder="Enter Password" type="password" fullWidth required />
                    <TextField style={textFieldMargin} label="Re-type Password" placeholder="Enter Password" type="password" fullWidth required />
                    <FormControlLabel style={textFieldMargin} control={<Checkbox unChecked disabled />} label="I accept all Terms and Conditions" />
                </div> : isInvited === false ? <div>
                    <Typography variant="h6" style={notInvited} >You are not invited to join this community</Typography>
                </div> : null}

                <Button style={btnStyle} onClick={e => handleSubmit(e)} variant="contained" color="primary" fullWidth>Sign Up</Button>
                <Typography style={textFieldMargin}> Already have an account.
                    <Link to={"/signin"}> Sign In</Link>
                </Typography>
            </Paper>
            {/* Add a snackbar */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={sever}>
                    {msg}
                </Alert>
            </Snackbar>

                </Grid>
                )
}

                export default SignUp