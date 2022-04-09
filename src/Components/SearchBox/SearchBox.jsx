import React from 'react'
import { SearchRounded } from '@mui/icons-material'
import { Grid, TextField, } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function SearchBox({ setSearchField }) {
    const classes = useStyles()
    return (
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <SearchRounded />
                </Grid>
                <Grid item>
                    <TextField variant="standard" onChange={event => setSearchField(event)} id="input-with-icon-grid" label="Search for Books" />
                </Grid>
            </Grid>
        </div>
    )
}
