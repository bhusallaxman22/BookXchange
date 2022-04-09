import React from 'react';
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
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import WriteIcon from "@mui/icons-material/EditOutlined";
import PostedIcon from "@mui/icons-material/PersonOutlineTwoTone";
import { Pagination } from '@mui/material';
import Variants from '../Profile/Variant';
import Divider from '@mui/material/Divider';
import AppBarHome from '../AppBar/AppBarHome';
import SearchBox from '../SearchBox/SearchBox';

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
                        justifyContent="center"
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
        </Box>
    );
}
