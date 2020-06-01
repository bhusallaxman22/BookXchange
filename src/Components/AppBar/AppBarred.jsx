import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ShoppingCartRounded, Favorite } from '@material-ui/icons'
export default function AppBarred({ isLoggedin }) {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link style={{ textDecoration: 'none', textAnchor: 'unset', color: "inherit" }} to={"/"}>   Bookstore(IMJC)</Link>
                    </Typography>

                    <IconButton aria-label="show shopping items" color="inherit">
                        <Badge badgeContent={2} color="secondary">
                            <ShoppingCartRounded />
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="show whitelist items" color="inherit">
                        <Badge badgeContent={3} color="secondary">
                            <Favorite />
                        </Badge>
                    </IconButton>
                    {!isLoggedin ? <Link style={{ textDecoration: 'none', textAnchor: 'unset' }} to={'/login'}> <Button color='secondary' >Login</Button></Link> : <Link style={{ textDecoration: 'none', textAnchor: 'unset' }} to={'/profile'}> <Button color='secondary' >Profile</Button></Link>}
                </Toolbar>
            </AppBar>
        </div>
    )
}


