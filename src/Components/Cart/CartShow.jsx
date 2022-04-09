import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Delete } from '@mui/icons-material';

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
        console.log("cleared the cart")
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
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            size="large">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.name}>
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
                                <ListItemText primary={`Book: ${item.name}`} secondary={`Faculty: ${item.faculty} \n| Price: ${item.discountedPrice}`} />
                                <IconButton onClick={handleDelete(item)} size="large">
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
