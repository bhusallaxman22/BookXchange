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

export default function CartShow({ open, handleClose, cart, setCart }) {
    const clearCart = () => {
        setCart([])
        console.log("cleared the carrt")
    }
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
                        {cart.length ? <Button size="small" autoFocus onClick={clearCart} style={{ background: 'red' }}>Clear Cart </Button> : null}

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Checkout
            </Button>

                    </Toolbar>
                </AppBar>
                <List>
                    {cart.map(item =>
                        <section key={Math.random()}>
                            <ListItem button>
                                <ListItemText primary={`Book: ${item.name}`} secondary={`Author: ${item.author} \n| Price: ${item.discountedPrice}`} />
                            </ListItem>
                            <Divider />
                        </section>
                    )}
                </List>
            </Dialog>
        </div>
    );
}
