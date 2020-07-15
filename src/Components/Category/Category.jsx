import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Box from "@material-ui/core/Box";
import AppBarred from '../AppBar/AppBarred';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { Grid, IconButton, Divider } from '@material-ui/core';
import Navigation from '../Navigation/Navigation';
import { ArrowRight, Settings, LocalHospitalOutlined, Computer, Money, Fingerprint } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));
const engineering = [
    "Civil", "Mechanical", "Computer", "Electrical", "Architecture", "Automobile"
]
const bsc = [
    "Bsc. CSIT", "BSc. General", "Bsc. Mathematics", "BSc. Physics"
]
const computer = [
    "BCA", "BIT", "BCS",
]
const Medecine = [
    "Medical MBBS", "Bachelor in Pharmacy", "Bacelor in Public Health", "Bachelor in Dental Studies"
]
const account = [
    "BBS", "BBA", "BBM", "BHM"
]

export default function Category({ isLoggedin }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openA, setOpenA] = React.useState(false);
    const [openB, setOpenB] = React.useState(false);
    const [openM, setOpenM] = React.useState(false);
    const [openC, setOpenC] = React.useState(false);

    const handleClickC = () => {
        setOpenC(!openC);
    };
    const handleClick = () => {
        setOpen(!open);
    };
    const handleClickA = () => {
        setOpenA(!openA);
    };
    const handleClickM = () => {
        setOpenM(!openM);
    };
    const handleClickB = () => {
        setOpenB(!openB);
    };
    return (
        <Box >
            <Box >
                <AppBarred isLoggedin={isLoggedin} />
                <Box className="main-content">
                    <Grid
                        container
                        alignContent="center"
                        alignItems="center"
                        justify="center"
                    >
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Select A Category
          </ListSubheader>
                            }
                            className={classes.root}
                        ><Divider />
                            <ListItem button onClick={handleClick}>
                                <ListItemIcon>
                                    <Settings />
                                </ListItemIcon>
                                <ListItemText primary="Engineering" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                {engineering.map(courses =>
                                    <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText primary={courses} /><IconButton> <ArrowRight /></IconButton>
                                        </ListItem>

                                    </List>
                                )}
                            </Collapse>
                            <ListItem button onClick={handleClickM}>
                                <ListItemIcon>
                                    <LocalHospitalOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Medecine" />
                                {openM ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openM} timeout="auto" unmountOnExit>
                                {Medecine.map(courses =>
                                    <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText primary={courses} /><IconButton> <ArrowRight /></IconButton>
                                        </ListItem>

                                    </List>
                                )}
                            </Collapse>
                            <ListItem button onClick={handleClickB}>
                                <ListItemIcon>
                                    <Fingerprint />
                                </ListItemIcon>
                                <ListItemText primary="BSc" />
                                {openB ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openB} timeout="auto" unmountOnExit>
                                {bsc.map(courses =>
                                    <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText primary={courses} /><IconButton> <ArrowRight /></IconButton>
                                        </ListItem>

                                    </List>
                                )}
                            </Collapse>
                            <ListItem button onClick={handleClickA}>
                                <ListItemIcon>
                                    <Money />
                                </ListItemIcon>
                                <ListItemText primary="Accounting" />
                                {openA ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openA} timeout="auto" unmountOnExit>
                                {account.map(courses =>
                                    <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText primary={courses} /><IconButton> <ArrowRight /></IconButton>
                                        </ListItem>

                                    </List>
                                )}
                            </Collapse>
                            <ListItem button onClick={handleClickC}>
                                <ListItemIcon>
                                    <Computer />
                                </ListItemIcon>
                                <ListItemText primary="Computer/Technology" />
                                {openC ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openC} timeout="auto" unmountOnExit>
                                {computer.map(courses =>
                                    <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText primary={courses} /><IconButton> <ArrowRight /></IconButton>
                                        </ListItem>

                                    </List>
                                )}
                            </Collapse>
                        </List>
                    </Grid>
                </Box>
            </Box>
            <Navigation />
        </Box>
    )
}
