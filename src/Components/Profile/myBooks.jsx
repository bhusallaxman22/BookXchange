import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import WriteIcon from "@mui/icons-material/EditOutlined";
import PostedIcon from "@mui/icons-material/PersonOutlineTwoTone";
import data from '../data';
import Variants from '../Profile/Variant';
import { Divider, AppBar, Toolbar, IconButton } from '@mui/material';
import { ChevronLeftRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 10,
        borderRadius: 25
    },
    media: {
        height: 140,
    },
    title: {
        flexGrow: 1,
    }
});


export default function MyBooks() {
    const classes = useStyles();
    const [datas, setdata] = useState([])
    useEffect(() => {
        setdata(data);
        console.log("effect")
    }, [])

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Link to={"/profile"}>
                        <IconButton size="large">
                            <ChevronLeftRounded />
                        </IconButton></Link>
                </Toolbar>
            </AppBar>
            <Box>
                <Grid className="inner-content"
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center" >
                    {!data.length ? (
                        <Box>
                            <Variants />
                        </Box>
                    ) : (
                            datas.map(data => <Card key={data.id} className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={data.image}
                                        title={data.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {data.name}
                                        </Typography>
                                        <Typography variant="subtitle2" color="inherit" component="span">
                                            <small><WriteIcon />Author:</small> {data.author}
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit" component="p">
                                            <small><PostedIcon />Posted by:</small>  {data.postedBy}
                                        </Typography>
                                        <Typography variant="subtitle2" color="inherit" component="p">
                                            <small>Original Price :</small>Rs.  {data.originalPrice}
                                        </Typography>
                                        <Typography variant="subtitle2" color="inherit" component="strong">
                                            <small>Discounted Price :</small>Rs.  {data.discountedPrice}
                                        </Typography>
                                        <Divider />
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {data.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit'
                                            }}
                                            to={{
                                                pathname: "/edit",
                                                search: `?id=${data.id}`,
                                                state: {
                                                    id: `${data._id}`,
                                                    author: `${data.author}`,
                                                    name: `${data.name}`,
                                                    description: `${data.description}`,
                                                    image: `${data.image}`,
                                                    originalPrice: `${data.originalPrice}`,
                                                    discountedPrice: `${data.discountedPrice}`
                                                }
                                            }}
                                        >
                                            Edit
                                        </Link>
                                    </Button>
                                </CardActions>
                            </Card>
                            ))}
                </Grid>
            </Box>
        </Box>
    );
}
