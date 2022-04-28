// Component to display Home component with sub_faculty filter from ../data.js
import { Card, CardActionArea, Typography, Button, CardActions, CardMedia, CardContent, Divider, Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PostedIcon from "@mui/icons-material/PersonOutlineTwoTone";
import WriteIcon from "@mui/icons-material/Edit";
// import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import AppBarHome from '../AppBar/AppBarHome';
import { useParams } from 'react-router-dom/';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        width: 300,
        maxHeight: 438,
        margin: 15,
        borderRadius: 25
    },
    media: {
        height: 140,
    },
    title: {
        flexGrow: 1,
    }
});


function Categorised(props) {
    const [data, setData] = useState([]);
    const [sub_faculty, setSubFaculty] = useState([]);
    const mainStyle = { height: "82vh", marginTop: "20px", overflow:"scroll" }
    const classes = useStyles();
    const { id } = useParams();
    useEffect(() => {
        setData(props.data);
        setSubFaculty(id);
    }
        , [props.data, props.category, props.sub_faculty,id]);

    // filter data based sub_faculty where sub_faculty is an array
    const filteredData = data.filter(item => item.sub_faculty.includes(sub_faculty));

    console.log(data);
    // Only display the filtered data in a Card
    const displayData = filteredData.map(data => {
        return (
            <Card key={data.id} className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`http://localhost:8000/media/images/harry.jpg`}
                        title={data.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {data.name}
                        </Typography>
                        <Typography variant="subtitle2" color="inherit" component="span">
                            <small><WriteIcon />Publication:{data.Publication}</small>
                        </Typography>
                        <Typography variant="subtitle1" color="inherit" component="p">
                            <small><PostedIcon />Faculty:</small> {data.faculty}
                        </Typography>
                        <Typography variant="subtitle2" color="inherit" component="strong">
                            <small>Price :</small>Rs.  {data.discountedPrice}
                        </Typography>
                        <Divider />
                        <Typography variant="body2" color="textSecondary" component="p">
                            {data.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="medium" onClick={() => props.addToCart(data)} color="primary">
                        Add To Cart
                    </Button>
                    <Button size="medium" onClick={() => props.addToWish(data)} color="primary">
                        Add To Wishlist
                    </Button>
                </CardActions>
            </Card>
        );
    }
    );

    return (
        <Box style={mainStyle}>
            <Grid spacing={3}
                container
                direction="row"
                justify="center"
                alignItems="center" >
                {displayData}
            </Grid>
        </Box>
    );
}

export default Categorised;

