import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Delete, SettingsApplications } from '@material-ui/icons';

// import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function WishShow({ open, handleClose, cart, setCart }) {
    const clearCart = () => {
        setCart([])
        console.log("cleared the carrt")
    }
    const handleDelete = (itemToDelete) => () => {
        setCart((cart) => cart.filter((cart) => cart.id !== itemToDelete.id));
    };
    const classes = useStyles();
    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Cart
                        </Typography>
                        {cart.length ? <Button size="small" autoFocus onClick={clearCart} style={{ background: 'red' }}>Clear Wishlist </Button> : null}
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Checkout
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    {cart.map(item =>
                        <section key={item.id * Math.random()}>
                            <ListItem button>
                                <ListItemText primary={`Book: ${item.name}`} secondary={
                                    //  `Faculty: ${item.faculty} | Year/Semester= ${item.year_sem} | Price: ${item.discountedPrice} `
                                    <div>
                                        <Typography variant='body2' component={"p"}>Faculty: {item.faculty} | Year/Semester= {item.year_sem}</Typography>
                                        <Typography variant='body2' component={"p"}>Price: {item.price}</Typography>
                                    </div>
                                } />
                                <IconButton onClick={handleDelete(item)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                            <Divider />
                        </section>
                    )}
                </List>
            </Dialog>
        </div>
    );
}
