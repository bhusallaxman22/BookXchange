// Component to display Home component with sub_faculty filter from ../data.js
import { Card, CardActionArea, Typography, Button, CardActions, CardMedia, CardContent, Divider, Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PostedIcon from "@mui/icons-material/PersonOutlineTwoTone";
import WriteIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/';
import { ArrowCircleRightOutlined } from '@mui/icons-material';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        width: 300,
        maxHeight: 438,
        marginTop:'5px',
        marginLeft: "20px",
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
    const mainStyle = { height: "82vh", margin: "20px 20px 20px 20px", overflow: "scroll" }
    const linkStyle = { textDecoration: "none", color: "inherit" }
    const classes = useStyles();
    const { id } = useParams();
    useEffect(() => {
        setData(props.data);
        setSubFaculty(id);
    }
        , [props.data, props.category, props.subcategory, id]);

    // filter data based sub_faculty where sub_faculty is an array
    const filteredData = data.filter(item => item.sub_faculty.includes(sub_faculty));
    console.log(data);
    const displayData = filteredData.map(data => {
        return (
                <Card key={data.id} className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={data.image}
                            title={data.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {data.bname}
                            </Typography>
                            <Typography variant="subtitle2" color="inherit" component="span">
                                <small><WriteIcon />Publication:{data.publication}</small>
                            </Typography>
                            <Typography variant="subtitle1" color="inherit" component="p">
                                <small><PostedIcon />Faculty:</small> {data.category}
                            </Typography>
                            <Typography variant="subtitle2" color="inherit" component="strong">
                                <small>Credit :</small>  {data.credit}
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
                        <Link to={`/book/${data.id}`} style={linkStyle}>
                                        <Button size="medium" color="primary">
                                            Read More<ArrowCircleRightOutlined />
                                        </Button>
                                    </Link>
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

