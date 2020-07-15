import React from 'react';
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
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import WriteIcon from "@material-ui/icons/EditOutlined";
import PostedIcon from "@material-ui/icons/PersonOutlineTwoTone";
import { Pagination } from "@material-ui/lab";
import Variants from '../Profile/Variant';
import Divider from '@material-ui/core/Divider';
import AppBarHome from '../AppBar/AppBarHome';
import SearchBox from '../SearchBox/SearchBox';
import { Link } from "react-router-dom";

/**
const books = gql`
  {
    books{
        name
        author{
            author
        }

    }
    }
  }
`;
**/

// import data from "../data";
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        width: 300,
        maxHeight: 438,
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


export default function Home({
    isLoggedin,
    datas,
    Cart,
    Wish,
    addToCart,
    addToWish,
    setCart,
    unique,
    setWish,
    setSearchField,
    setCategory,
    category,
    filteredResults
}) {
    const classes = useStyles();
    const [Page, setPage] = React.useState(1);
    const [bookCount, setbookCount] = React.useState(4)
    function paginateGood(array, page_size, page_number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
    const handlePageChange = (event, value) => {
        setPage(value)
    };
    let optValue;
    const handleCategory = dat => {
        setCategory(optValue);
        setPage(1)
        console.log("Category:", dat, "\nDatas:", filteredResults)
    }
    const handleCount = (event, value) => {
        setbookCount(event.target.value);

    }
    const count = Math.ceil(datas.length / bookCount)
    return (
        <Box>
            <Box>
                <AppBarHome
                    isLoggedin={isLoggedin}
                    Cart={Cart}
                    Wish={Wish}
                    setCart={setCart}
                    setWish={setWish}
                    setSearchField={setSearchField}
                />
                <Box className="main-content">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <SearchBox setSearchField={setSearchField} />
                        <Divider orientation="vertical" flexItem />
                        <FormControl variant="filled">
                            <InputLabel id="genre0-select-label">Genre</InputLabel>
                            <Select
                                labelId="genre-select-opt"
                                label='Category'
                                id="genre-select"
                                value={category}
                                onChange={handleCategory}
                            >
                                <MenuItem
                                    onClick={() => optValue = 'All'} value={'All'}>All</MenuItem>
                                {unique.sort().map(dat => <MenuItem key={dat}
                                    onClick={() => optValue = dat} value={dat}>{dat}</MenuItem>)}
                            </Select>
                            <FormHelperText>Select Genre.</FormHelperText>
                        </FormControl>
                    </div>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center" >
                        {!datas.length ? (
                            <Box>
                                <Variants />
                            </Box>
                        ) : (
                                paginateGood(datas, bookCount, Page).map(data => <Card key={data.id} className={classes.root}>
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
                                                <small><WriteIcon />Author:{data.author}</small>
                                            </Typography>
                                            <Typography variant="subtitle1" color="inherit" component="p">
                                                <small><PostedIcon />Posted by:</small>  <Link to={"/user/:id"} > {data.postedBy.firstName} {data.postedBy.lastName}</Link>
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
                                        <Button size="medium" onClick={() => addToCart(data)} color="primary">
                                            Add To Cart
                                </Button>
                                        <Button size="medium" onClick={() => addToWish(data)} color="primary">
                                            Add To Wishlist
                </Button>
                                    </CardActions>
                                </Card>
                                ))}
                    </Grid><br />
                    <div
                        style={{ alignContent: 'center', textAlign: 'center', display: 'flex', justifyContent: 'center' }}

                    >
                        <Pagination
                            count={count}
                            onChange={handlePageChange}
                            showFirstButton
                            showLastButton
                            color="primary"
                        />
                        <Divider orientation="vertical" flexItem />
                        <FormControl>
                            <InputLabel>Number</InputLabel>
                            <Select
                                labelId="show-book-opt"
                                label='No'
                                id="count-select"
                                value={bookCount}
                                onChange={handleCount}
                            >
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                            <FormHelperText>books per page</FormHelperText>
                        </FormControl>
                    </div>
                </Box>
            </Box>
            < Navigation />
        </Box>
    )
}
