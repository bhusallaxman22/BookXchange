import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Navigation from '../Navigation/Navigation';
import Grid from '@material-ui/core/Grid';
import WriteIcon from "@material-ui/icons/EditOutlined";
import PostedIcon from "@material-ui/icons/PersonOutlineTwoTone";
import data from '../data';
import Variants from '../Profile/Variant';
import AppBarred from '../AppBar/AppBarred';
import { Divider } from '@material-ui/core';
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


export default function Home({ isLoggedin }) {
    const classes = useStyles();
    const [datas, setdata] = useState([])
    useEffect(() => {
        setdata(data);
        console.log("effect")
    }, [])

    return (
        <Box>

            <Box>
                <AppBarred isLoggedin={isLoggedin} />
                <Grid className="main-content"
                    container
                    direction="row"
                    justify="center"
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
                                    <Button size="medium" color="primary">
                                        Add To Cart
                </Button>
                                    <Button size="medium" color="primary">
                                        Add To Wishlist
                </Button>
                                </CardActions>
                            </Card>
                            ))}
                </Grid>
            </Box>
            < Navigation />
        </Box>
    )
}
