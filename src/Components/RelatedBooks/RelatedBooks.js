// created a grid of cards of related books from the ./datas
import React from 'react';
import { makeStyles } from '@mui/styles';
import {Grid,Typography,Card,CardActionArea,CardMedia,CardActions,CardContent,Divider,Button} from "@mui/material"
import { Link } from 'react-router-dom';
import { ArrowCircleRightOutlined,StarTwoTone } from '@mui/icons-material';
import datas from "../data"
import PostedIcon from "@mui/icons-material/PersonOutlineTwoTone";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '95vh',
        padding: '0px',
        margin: '0px',
    },
    card: {
        minHeight: 300,
    },

    media: {
        height: 140,
        borderRadius: 10,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
// function to return array of related books of similar categories from the data \
function RelatedBooks(props){
    const classes = useStyles();
    const [books,setBooks] = React.useState([]);

    React.useEffect(()=>{
        setBooks(data=>{
            return datas.filter(booke=>{
                return booke.faculty === props.book.faculty && booke.id !== props.book.id
            })
        } )
    },[props.book.faculty,props.book.id])
    return(
        <div className={classes.root}>
            <Grid container direction="row" spacing={3}>
                {books.map(data=>(
                    <Grid item key={data.id}>
                        <Card className={classes.card}>
                        <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={`https://picsum.photos/200/300?random=${data.id}`}
                                        title={data.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {data.name}
                                        </Typography>

                                        <Typography variant="subtitle1" color="inherit" component="p">
                                            <small><PostedIcon />Faculty:</small> {data.faculty}
                                        </Typography>
                                        <Typography variant="subtitle2" component="strong" alignContent={"center"}>
                                            <small > <StarTwoTone/> Credit :</small> <span style={{color:"blue"}}>{data.discountedPrice}</span> 
                                        </Typography>
                                        <Divider />
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="medium" onClick={() => props.addToCart(data)} color="primary">
                                        Add To Cart
                                    </Button>
                                    <Link to={`/book/${data.id}`}>
                                    <Button size="medium" color="primary">
                                        Read More<ArrowCircleRightOutlined />
                                    </Button>
                                    </Link>
                                </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
export default RelatedBooks;