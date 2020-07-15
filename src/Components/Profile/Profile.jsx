import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Box, ListItem, ListItemIcon, ListSubheader, ListItemSecondaryAction, ListItemText, Grid, Container, Typography, Card, CardActionArea, CardContent, CardMedia, Divider, List, Switch, IconButton, Fab } from '@material-ui/core';
import Variants from './Variant';
import { makeStyles } from "@material-ui/core/styles";
import { SchoolRounded, Home, Person, WbSunnyRounded, Book, ChevronRight, Add } from '@material-ui/icons'
import profileData from './profileData';
import AppBarred from '../AppBar/AppBarred';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
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
    },
    fabBtn: {
        position: 'absolute',
        bottom: theme.spacing(5),
        right: theme.spacing(2),
    }
}));
export default function Profile({ darkState, handleThemeChange, isLoggedin, setLogin }) {
    const classes = useStyles();
    const [data, setdata] = React.useState([]);
    React.useEffect(() => {
        setdata(profileData);
    }, [])
    return (
        <Box>
            <Box >
                <AppBarred isLoggedin={isLoggedin} darkState={darkState} handleThemeChange={handleThemeChange} />
                <Box className="main-content">
                    <Container className="container">
                        <Grid
                            container
                            justify="center"
                            alignContent="center"
                            alignItems="center"
                            className="row">
                            <Card className={classes.root}>
                                <List subheader={<ListSubheader>Profile</ListSubheader>} className={classes.root}>
                                </List>{isLoggedin ? (!data.length ? <Variants /> : (
                                    data.map(data =>
                                        <div>
                                            <CardActionArea key={data.name}>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={data.img}
                                                    title={data.name}
                                                />
                                                <CardContent>
                                                    <Typography style={{ textAlign: 'center' }} component="h4" variant="h4">
                                                        {data.name}
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
                                            <Link to="/add" style={{ color: "inherit", textDecoration: "inherit" }}>
                                                <Fab className={classes.fabBtn} title="Add Book" > <Add /> </Fab></Link>
                                        </div>
                                    )
                                )) :
                                    <Container>
                                        <Typography component="p" variant="body2" >
                                            Seems Like You're not Logged in
                                        </Typography>
                                        <Typography component="strong" variant="button">
                                            <Link to={"/login"} >Please Login</Link>
                                        </Typography>
                                    </Container>}

                                <Divider />
                                <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <WbSunnyRounded />
                                        </ListItemIcon>
                                        <ListItemText id="switch-list-label-darkmode" primary="Darkmode" />
                                        <ListItemSecondaryAction>
                                            <Switch
                                                edge="end"
                                                checked={darkState}
                                                onChange={handleThemeChange}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem><Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Book />
                                        </ListItemIcon>
                                        <ListItemText id="myBooks" primary="My Books" />
                                        <ListItemSecondaryAction>
                                            <IconButton>
                                                <Link style={{ color: 'inherit', textDecoration: 'none' }} to={'/myBooks'} >
                                                    <ChevronRight />
                                                </Link>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Navigation />
        </Box>

    )
}
