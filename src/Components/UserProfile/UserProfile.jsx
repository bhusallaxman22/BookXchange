import React from 'react';
import Navigation from '../Navigation/Navigation';
import {
    Box,
    // ListItem,
    // ListItemIcon,
    ListSubheader,
    // ListItemSecondaryAction,
    // ListItemText,
    Grid,
    Container,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    List,
    // Switch,
    //  IconButton
} from '@mui/material';
import Variants from '../Profile/Variant';
import makeStyles from '@mui/styles/makeStyles';
import { SchoolRounded, Home, Person } from '@mui/icons-material'
// import profileData from './profileData';
import AppBarred from '../AppBar/AppBarred';
// import { Link } from 'react-router-dom';
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
export default function UserProfile({ isLoggedin, data }) {
    const classes = useStyles();
    // const [data, setdata] = React.useState([]);
    // React.useEffect(() => {
    //     setdata(data);
    // }, []);
    // const profileData = data.postedBy
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
                                </List>{(!data.length ? <Variants /> : (
                                    data.map(sara => {
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
