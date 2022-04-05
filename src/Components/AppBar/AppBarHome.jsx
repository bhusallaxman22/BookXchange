import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ShoppingCartRounded, Favorite } from '@material-ui/icons'
import CartShow from '../Cart/CartShow';
import WishShow from '../Cart/WishShow';
export default function AppBarHome({
    isLoggedin,
    Cart,
    Wish,
    setCart,
    setWish,
}) {
    const [open, setOpen] = React.useState(false);
    const [openWish, setOpenWish] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenWish = () => {
        setOpenWish(true);
    };

    const handleCloseWish = () => {
        setOpenWish(false);
    };
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link style={{ textDecoration: 'none', textAnchor: 'unset', color: "inherit" }} to={"/"}>   Book Exchange</Link>
                    </Typography>
                    <IconButton aria-label="show shopping items" color="inherit" onClick={handleOpen}>
                        <Badge badgeContent={Cart.length} color="secondary">
                            <ShoppingCartRounded />
                        </Badge>
                    </IconButton>
                    <CartShow open={open} handleClose={handleClose} handleOpen={handleOpen} cart={Cart} setCart={setCart} />
                    <IconButton aria-label="show whitelist items" color="inherit" onClick={handleOpenWish}>
                        <Badge badgeContent={Wish.length} color="secondary">
                            <Favorite />
                        </Badge>
                    </IconButton>
                    <WishShow open={openWish} handleClose={handleCloseWish} handleOpen={handleOpenWish} cart={Wish} setCart={setWish} />

                    {!isLoggedin ? <Link style={{ textDecoration: 'none', textAnchor: 'unset' }} to={'/login'}> <Button color='secondary' >Login</Button></Link> : <Link style={{ textDecoration: 'none', textAnchor: 'unset' }} to={'/profile'}> <Button color='secondary' >Profile</Button></Link>}
                </Toolbar>
            </AppBar>
        </div>
    )
}


