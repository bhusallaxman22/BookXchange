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
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, Container } from '@mui/material';
import { Pagination } from '@mui/material';
import Variants from '../Profile/Variant';
import Divider from '@mui/material/Divider';
import SearchBox from '../SearchBox/SearchBox';
import { ArrowCircleRightOutlined, StarTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';



// import data from "../data";
const useStyles = makeStyles({
    root: {
        //yarn maxWidth: 180,
        width: 300,
        minHeight: 300,
        margin: 10,
        borderRadius: 25
    },
    media: {
        height: 140,
        // width: 100,
        borderRadius: 25

    },
    title: {
        flexGrow: 1,
    }
});


export default function Home({
    datas,
    addToCart,
    unique,
    setSearchField,
    setCategory,
    category,
    filteredResults
}) {
    const classes = useStyles();
    const [Page, setPage] = React.useState(1);
    const [bookCount, setbookCount] = React.useState(8)
    const linkStyle = { color: "inherit", textDecoration: "none" };
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
                        {/* Featured Books beside the Menu */}
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginRight: '10px'
                        }}>
                        </Box>
                    </div>
                    <Container>
                        <Typography variant="h6" component="h6" color={"GrayText"} style={{ textAlign: "center", marginTop: '20px' }}>
                            Featured Books
                        </Typography>
                    </Container>
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
                                        image={data.image}
                                        title={data.bname}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {data.bname}
                                        </Typography>

                                        <Typography variant="subtitle1" color="inherit" component="p">
                                            {/* <small><PostedIcon />Faculty:</small> {data.category} */}
                                        </Typography>
                                        <Typography variant="subtitle2" component="strong" alignContent={"center"}>
                                            <small > <StarTwoTone /> Credit :</small> <span style={{ color: "blue" }}>{data.credit}</span>
                                        </Typography>
                                        <Divider />
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="medium" onClick={() => addToCart(data)} color="primary">
                                        Add To Cart
                                    </Button>
                                    <Link to={`/book/${data.id}`} style={linkStyle}>
                                        <Button size="medium" color="primary">
                                            Read More<ArrowCircleRightOutlined />
                                        </Button>
                                    </Link>
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
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                            <FormHelperText>books per page</FormHelperText>
                        </FormControl>
                    </div>
                </Box>
            </Box>
        </Box>
    );
}
