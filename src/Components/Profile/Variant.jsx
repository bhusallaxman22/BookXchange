import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Grid, Box } from '@mui/material';

export default function Variants() {
    return (
        <Box color="text.dark" >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <div>
                    <Skeleton variant="rectangular" width={210} height={118} />
                    <Skeleton variant="text" animation="pulse" width={210} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} /><br />
                </div>
                <div>
                    <Skeleton variant="rectangular" width={210} height={118} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} /><br />
                </div>
                <div>
                    <Skeleton variant="rectangular" width={210} height={118} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} /><br />
                </div>            <div>
                    <Skeleton variant="rectangular" width={210} height={118} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} />
                    <Skeleton variant="text" width={210} /><br />
                </div>
            </Grid>
        </Box>
    );
}