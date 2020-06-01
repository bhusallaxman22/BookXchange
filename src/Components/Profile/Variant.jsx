import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Box } from '@material-ui/core';

export default function Variants() {
    return (
        <Box color="text.dark" >
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <div>
                    <Skeleton variant="rect" width={210} height={118} />
                    <Skeleton variant="text" animation="pulse" width={210} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} /><br />
                </div>
                <div>
                    <Skeleton variant="rect" width={210} height={118} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} /><br />
                </div>            <div>
                    <Skeleton variant="rect" width={210} height={118} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} /><br />
                </div>            <div>
                    <Skeleton variant="rect" width={210} height={118} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} /><br />
                </div>
            </Grid>
        </Box>
    );
}