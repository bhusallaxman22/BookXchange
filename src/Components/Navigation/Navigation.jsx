import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/HomeRounded';
// import AddRoundIcon from '@material-ui/icons/AddBoxRounded';
import ProfileIcon from '@material-ui/icons/PersonRounded';
import Fab from '@material-ui/core/Fab'
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles({
  root: {
    width: 500,
    bottom: 0
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    // top: -30,
    // left: 0,
    // right: 0,
    // margin: '0 auto',
  },
});

export default function Navigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleClickNav = () => {
    window.navigator.vibrate(50);
  }
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
        <BottomNavigationAction onClick={handleClickNav} value="home" component={Link} to="/" label="Home" icon={<HomeIcon />} />
        <Fab color="secondary" onClick={handleClickNav} className={classes.fabButton}>
          <BottomNavigationAction showLabel value="add" component={Link} label="" to={"/add"} icon={<AddIcon />} />
        </Fab>
        <BottomNavigationAction onClick={handleClickNav} value="profile" component={Link} to="/profile" label="Profile" icon={<ProfileIcon />} />
      </BottomNavigation>
    </div>
  );
}
