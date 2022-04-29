import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/HomeRounded';
// import AddRoundIcon from '@mui/icons-material/AddBoxRounded';
import ProfileIcon from '@mui/icons-material/PersonRounded';
import Fab from '@mui/material/Fab';
import Message from '@mui/icons-material/Message';
import { Link } from 'react-router-dom';
import Chat from "../Chat/Chat";
const useStyles = makeStyles({
  root: {
    width: 500,
    bottom: 0
  },

});

export default function Navigation() {
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  return (
    <div className="nav-botn">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction showLabel value="home" component={Link} to={"/"} label="Home" icon={<HomeIcon />} />
        {/* <BottomNavigationAction showLabel value="add" component={Link} label="Categories" to={"/categories"} icon={<List />} /> */}
        <BottomNavigationAction showLabel value="profile" component={Link} to={"/profile"} label="Profile" icon={<ProfileIcon />} />
        <Fab color="primary" onClick={setOpen} size="medium" aria-label="add">
          <Message />
        </Fab>
        {open ? <Chat open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} /> : null}
      </BottomNavigation>
    </div>
  );
}
