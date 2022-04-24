import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { ShoppingCartRounded } from '@mui/icons-material'
import CartShow from '../Cart/CartShow';
export default function AppBarHome({
    isLoggedin,
    Cart,
    Wish,
    setCart,
}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link style={{ textDecoration: 'none', textAnchor: 'unset', color: "inherit" }} to={"/"}>   Book Exchange</Link>
                    </Typography>
                    <IconButton
                        aria-label="show shopping items"
                        color="inherit"
                        onClick={handleOpen}
                        size="large">
                        <Badge badgeContent={Cart.length} color="secondary">
                            <ShoppingCartRounded />
                        </Badge>
                    </IconButton>
                    <CartShow open={open} handleClose={handleClose} handleOpen={handleOpen} cart={Cart} setCart={setCart} />
                    {!isLoggedin ? <Link style={{ textDecoration: 'none', textAnchor: 'unset' }} to={'/login'}> <Button color='secondary' >Login</Button></Link> : <Link style={{ textDecoration: 'none', textAnchor: 'unset' }} to={'/profile'}> <Button color='secondary' >Profile</Button></Link>}
                </Toolbar>
            </AppBar>
        </div>
    );
}


