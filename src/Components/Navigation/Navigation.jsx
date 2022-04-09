import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/HomeRounded';
// import AddRoundIcon from '@mui/icons-material/AddBoxRounded';
import ProfileIcon from '@mui/icons-material/PersonRounded';
import { Link } from 'react-router-dom';
import { List } from '@mui/icons-material';
const useStyles = makeStyles({
  root: {
    width: 500,
    bottom: 0
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
        <BottomNavigationAction showLabel value="add" component={Link} label="Categories" to={"/categories"} icon={<List />} />
        <BottomNavigationAction onClick={handleClickNav} value="profile" component={Link} to="/profile" label="Profile" icon={<ProfileIcon />} />
      </BottomNavigation>
    </div>
  );
}
