import React from 'react';
import { Box, Grid, Container, Typography, IconButton, Card, Divider } from '@mui/material';
import { PowerSettingsNew, Share } from '@mui/icons-material'
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InputBase from '@mui/material/InputBase';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PostedIcon from "@mui/icons-material/PersonOutlineTwoTone";
import { ArrowCircleRightOutlined, StarTwoTone } from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
const inviteRaadd = { backgroundColor: "#f5f5f5", borderRadius: "10px", padding: "20px", margin: "10px", textAlign: "center" }
const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: 10,
    borderRadius: 25
}
const cardMediaStyle = {
    height: 140,
}


export default function Profile({ darkState, handleThemeChange, isLoggedin, setLogin }) {
    const history = useHistory();
    const [mybooks, setMybooks] = React.useState([]);
    const linkStyle = { color: "inherit", textDecoration: "none" };
    const [femail, setfemail] = React.useState('');
    const [data, setData] = React.useState([]);
    function soldOut(data) {
        const id = data.id;
        console.log(id)
        const dat = {
            bid: parseInt(id),
            bflag: 1,
        }
        // send post request to /api/v1/flagsold with bearer token
        axios.post('/api/v1/flagsold', dat, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res.data)
            }
            )
            .catch(err => console.log(err))

    }
    React.useEffect(() => {
        axios.get('/api/v1/account/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    console.log("from profile", res.data)
                    setData(res.data)
                    console.log(data)
                }
            })
            .catch(err => console.log(err))
        axios.get('/api/v1/user/books', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    console.log("my Books", res.data)
                    setMybooks(res.data)
                    console.log(data)
                }
            }
            )
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [data.id])
    const aliDheraiPadding = { padding: '20px', textAlign: 'center' }
    const nayaprofileimg = { height: "200px", width: "200px", borderRadius: "50%", margin: "10px" }
    function handleLogout() {
        console.log("logout")
        axios.post('api/v1/account/logout', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    console.log("logout")
                    localStorage.removeItem('token')
                    setLogin(false)
                }
            })
            .catch(err => console.log(err))
        localStorage.clear()
        setLogin(false)
        history.push('/')
    }

    function handleEmSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', femail);
        axios.post('/api/v1/invite', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setfemail('')
                    console.log(res.data)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <Box style={{ marginTop: '15px', height: "85vh",overflow:"scroll" }}>
            {isLoggedin ?
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={1} m={1}>
                                <img style={nayaprofileimg} src={data.image} alt="book" width="100%" height="100%" />
                            </Box>
                            <Typography variant="h6" component="h2" gutterBottom align='center'>
                                User ID: {data.id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Box display="flex" flexDirection="column" p={1} m={1}>

                                <Typography variant="h4" component="h1" gutterBottom>
                                    {data.first_name} {data.last_name}
                                </Typography>
                                <Typography variant="p" component="p" gutterBottom>
                                    {data.note}
                                </Typography>
                                <Typography variant="h6" component="h5" gutterBottom>
                                    <b>Phone No:</b> {data.phone}
                                </Typography>
                                <Typography variant="h6" component="h5" gutterBottom>
                                    <b>Level:</b> {data.level}
                                </Typography>
                                <Typography variant="h6" component="h5" gutterBottom>
                                    <b>Faculty:</b> {data.faculty}
                                </Typography>
                                <Typography variant="h6" component="h5" gutterBottom>
                                    <b>Credit:</b> {data.credit}
                                </Typography>

                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>

                            <Link to={"/add"} style={linkStyle}><Button variant="contained" color="primary" style={{ borderRadius: "10px", padding: "10px", margin: "10px" }}>
                                Add a Book
                            </Button>
                            </Link>
                            <Button variant="contained" color="success" style={{ borderRadius: "10px", padding: "10px", margin: "10px" }}>
                                Edit Profile
                            </Button>
                            <IconButton onClick={() => handleLogout()} variant="contained" color="success" >
                                <PowerSettingsNew />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid style={inviteRaadd}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                You Can Invite Upto Two frinds
                            </Typography>
                            {data.invites !== 2 ?
                             <Paper
                             component="form"
                             onSubmit={(e) => handleEmSubmit(e)}
                             sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                         >
                             <InputBase
                                 sx={{ ml: 1, flex: 1 }}
                                 placeholder="Enter Friends Email Address"
                                 inputProps={{ 'aria-label': 'enter email address' }}
                                 value={femail}
                                 onChange={(e) => setfemail(e.target.value)}
                             />
                             <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                 <Share />
                             </IconButton>
                         </Paper>
                            :
                            <Typography variant="h6" component="subtitle" gutterBottom>
                                You already used your two invites
                            </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid style={aliDheraiPadding}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            My Books
                        </Typography>
                        <Grid container spacing={2}>

                            {mybooks.map((data, index) => {
                                return (
                                    <Card key={index} style={cardStyle}>
                                        <CardActionArea>
                                            <CardMedia
                                                style={cardMediaStyle}
                                                image={data.image}
                                                title={data.bname}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {data.bname}
                                                </Typography>

                                                <Typography variant="subtitle1" color="inherit" component="p">
                                                    <small><PostedIcon />Faculty:</small> {data.category}
                                                </Typography>
                                                <Typography variant="subtitle2" component="strong" alignContent={"center"}>
                                                    <small > <StarTwoTone /> Credit :</small> <span style={{ color: "blue" }}>{data.credit}</span>
                                                </Typography>
                                                <Divider />
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="medium" onClick={() => soldOut(data)} color="primary">
                                                Sold Out
                                            </Button>
                                            <Link to={`/book/${data.id}`} style={linkStyle}>
                                                <Button size="medium" color="primary">
                                                    Read More<ArrowCircleRightOutlined />
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Container>
                : <Container maxWidth="lg">
                    <Typography variant="h6" component="h2" gutterBottom align='center'>
                        Please Login to see your profile
                    </Typography>
                    <Link to={"/login"} style={linkStyle}>
                        <Button variant="contained" color="primary" style={{ borderRadius: "10px", padding: "10px", margin: "10px" }}>
                            Login
                        </Button>
                    </Link>
                </Container>
            }

        </Box>
    )
}