import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Box from "@mui/material/Box";
import AppBarred from '../AppBar/AppBarred';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Grid, IconButton, Divider } from '@mui/material';
import { ArrowRight, Settings, LocalHospitalOutlined, Computer, Money, Fingerprint } from '@mui/icons-material';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


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
    "CSIT", "General", "Mathematics", "Physics", 
]
const computer = [
    "BCA", "BIT", "BCS",
]
const Medecine = [
    "MBBS", "Bachelor in Pharmacy", "BPH", "BDS", 
]
const account = [
    "BBS", "BBA", "BBM", "BHM", 
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
                <Box className="main-content">
                    <Grid
                        container
                        alignContent="center"
                        alignItems="center"
                        justifyContent="center"
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
                                            <ListItemText primary={courses} />
                                            <Link to={`/books/${courses}`}>
                                                <IconButton size="large"> <ArrowRight /></IconButton>
                                            </Link>
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
                                            <ListItemText primary={courses} />
                                            <Link to={`/books/${courses}`}>
                                                <IconButton size="large"> <ArrowRight /></IconButton>
                                            </Link>
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
                                            <ListItemText primary={courses} />
                                            <Link to={`/books/${courses}`}>
                                                <IconButton size="large"> <ArrowRight /></IconButton>
                                            </Link>
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
                                            <ListItemText primary={courses} />
                                            <Link to={`/books/${courses}`}>
                                                <IconButton size="large"> <ArrowRight /></IconButton>
                                            </Link>
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
                                            <ListItemText primary={courses} />
                                            <Link to={`/books/${courses}`} >
                                            <IconButton size="large"> <ArrowRight /></IconButton>
                                            </Link>
                                        </ListItem>
                                    </List>
                                )}
                            </Collapse>
                        </List>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
