import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';

export default function AppBarred({ isLoggedin }) {

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link style={{ textDecoration: 'none', textAnchor: 'unset', color: "inherit" }} to={"/"}>   Book Exchange</Link>
                    </Typography>
                    {!isLoggedin ? <Link style={{ textDecoration: 'none', textAnchor: 'unset' }} to={'/login'}> <Button color='secondary' >Login</Button></Link> : <Link style={{ textDecoration: 'none', textAnchor: 'unset' }} to={'/profile'}> <Button color='secondary' >Profile</Button></Link>}
                </Toolbar>
            </AppBar>
        </div>
    )
}


