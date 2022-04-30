import React from 'react';
import Navigation from '../Navigation/Navigation';
import {
    Box,

    ListSubheader,
    Grid,
    Container,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    List,
} from '@mui/material';
import Variants from '../Profile/Variant';
import makeStyles from '@mui/styles/makeStyles';
import { SchoolRounded, Home, Person } from '@mui/icons-material'
import AppBarred from '../AppBar/AppBarred';
import axios from 'axios';
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 10,
        borderRadius: 25
    },
    media: {
        height: 200,
    },
    title: {
        flexGrow: 1,
    }
});
export default function UserProfile({ isLoggedin }) {
    const classes = useStyles();
    const [profileData, setProfileData] = React.useState([]);
    React.useEffect(() => {
        axios.get('/api/v1/user/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res.data)
                setProfileData(res.data)

            })
            .catch(err => console.log(err))

    }, [profileData])

    return (
        <Box>
            <Box >
                <AppBarred isLoggedin={isLoggedin} />
                <Box className="main-content">
                    <Container className="container">
                        <Grid
                            container
                            justifyContent="center"
                            alignContent="center"
                            alignItems="center"
                            className="row">
                            <Card className={classes.root}>
                                <List subheader={<ListSubheader>Profile</ListSubheader>} className={classes.root}>
                                </List>{(!profileData.length ? <Variants /> : (
                                    profileData.map(sara => {
                                        const data = sara.postedBy
                                        return <CardActionArea key={data.name}>
                                            <CardMedia
                                                className={classes.media}
                                                image={data.img}
                                                title={data.name}
                                            />
                                            <CardContent>
                                                <Typography style={{ textAlign: 'center' }} component="h4" variant="h4">
                                                    {data.firstName} {data.lastName}
                                                </Typography>
                                                <Divider />
                                                <Typography component="small" variant="subtitle1" >
                                                    <SchoolRounded />{data.school}
                                                </Typography><br />
                                                <Typography component="small" varaint="subtitle1">
                                                    <Person /> {data.profession}
                                                </Typography><br />
                                                <Typography component="small" variant="subtitle1">
                                                    <Home />{data.address}
                                                </Typography>
                                                <Divider />
                                                <Typography style={{ textAlign: 'center' }} component="p" variant="caption">
                                                    {data.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    })))}
                            </Card>
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Navigation />
        </Box>
    );
}
