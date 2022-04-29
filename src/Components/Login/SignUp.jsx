import { AccountBoxOutlined } from '@mui/icons-material'
import { Alert, Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
// import emails from "./emails"
import axios from 'axios'

function SignUp(props) {
    const [isInvited, setInvited] = React.useState("")
    const [email, setEmail] = React.useState('')
    const [chkmail, setChkmail] = React.useState(true)
    const [password, setPassword] = React.useState('')
    const paperStyle = { padding: 20, height: '80vh', overFlow: "scroll", width: '280px', margin: "20px auto" }
    const avatarStyle = { backgroundColor: 'green', padding: '2px', marginBottom: '8px' }
    const textFieldMargin = { marginTop: '10px' }
    const mainStyle = { height: "85vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", overFlow: "scroll" }
    const marginHead = { marginTop: '10px' }
    const notInvited = { color: "red", fontSize: "12px" }
    const btnStyle = { margin: '8px 0', width: "100%" }
    const [open, setOpen] = React.useState(false);
    const [sever, setSever] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const [fname, setFname] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [lname, setLname] = React.useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    function checkInvited(e) {
        e.preventDefault();
        // check if email is invited in /api/v1/emails
        axios.post("/api/v1/email", {
            email: email
        })
            .then(res => {
                if (res.data.length > 0) {
                    setInvited(true)
                    setChkmail(false);
                    setSever("success")
                    setMsg("You are invited to join the community")
                    setOpen(true)
                    console.log("Response", res.data)
                }
            })
            .catch(err => {
                setSever("error")
                setInvited(false)
                setChkmail(true);
                if (err.status === 404) {
                    setMsg("Email not found")
                }
                else {
                    setMsg("Something went wrong")
                }
                setOpen(true)
            })
    }
    function handleSubmit(e) {
        e.preventDefault();
        async function postData() {
            await axios.post('/api/v1/account/register', {
                email: email,
                password: password,
                user_name: username,
                password2: password,
                first_name: fname,
                last_name: lname
            })
                .then(res => {
                    if (res.data.response === "user with this email already exists") {
                        setSever("warning")
                        setMsg("User with this email already exists");
                        setOpen(true)

                    }

                    console.log(res)
                })
                .catch(err => {
                    setMsg(err.data);
                    setSever("error");
                    setOpen(true)
                    console.log(err);
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
                {chkmail ? <Button style={btnStyle} onClick={e => checkInvited(e)} variant="contained" color="primary" fullWidth>Sign Up</Button> : null}

                {isInvited === true ? <div>
                    <TextField style={textFieldMargin} value={username} onChange={e => setUsername(e.target.value)} label="Username" placeholder="Enter Username" fullWidth required />
                    <TextField style={textFieldMargin} value={fname} onChange={e => setFname(e.target.value)} label="First Name" placeholder="Enter First Name" fullWidth required />
                    <TextField style={textFieldMargin} value={lname} onChange={e => setLname(e.target.value)} label="Last Name" placeholder="Enter Last Name" fullWidth required />
                    {/* <TextField style={textFieldMargin} label="Phone" placeholder="Phone Number" fullWidth required /> */}
                    <TextField style={textFieldMargin} value={password} onChange={e => setPassword(e.target.value)} label="Password" placeholder="Enter Password" type="password" fullWidth required />
                    <TextField style={textFieldMargin} label="Re-type Password" placeholder="Enter Password" type="password" fullWidth required />
                    <FormControlLabel style={textFieldMargin} control={<Checkbox unChecked disabled />} label="I accept all Terms and Conditions" />
                    <Button style={btnStyle} onClick={e => handleSubmit(e)} variant="contained" color="primary" fullWidth>Sign Up</Button>

                </div> : isInvited === false ? <div>
                    <Typography variant="h6" style={notInvited} >You are not invited to join this community</Typography>
                </div> : null}

                <Typography style={textFieldMargin}> Already have an account.
                    <Link to={"/login"}> Sign In</Link>
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