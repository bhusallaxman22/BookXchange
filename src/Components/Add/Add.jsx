import React from 'react';
import Navigation from '../Navigation/Navigation';
import Box from "@mui/material/Box";
import AppBarred from '../AppBar/AppBarred';
import { Typography, Grid, TextField, Button, FormControl, InputAdornment, Container } from '@mui/material';
// import data from '../data';
import { Link, useHistory } from 'react-router-dom';
import Tags from "./Tag";
export default function Add({ isLoggedin }) {
    const history = useHistory();
    const [values, setValues] = React.useState({
        name: '',
        description: '',
        author: '',
        originalPrice: '',
        discountedPrice: '',
        image: "",
        postedBy: 'Laxman Bhusal'
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { name, description, author, originalPrice, discountedPrice, image, postedBy } = values;
        // const data = {
        //     name,
        //     description,
        //     author,
        //     originalPrice,
        //     discountedPrice,
        //     image,
        //     postedBy
        // }
        const empty = {
            name: '',
            description: '',
            author: "",
            originalPrice: '',
            discountedPrice: '',
            image: '',
            tegs: [],
            postedBy: 'Laxman Bhusal'
        }
        // await fetch('http://localhost:5000/datas', {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // })
        //     .then(res => res.json())
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err))
        history.push("/");
        setValues(empty);
    }
    return (
        <Box >
            <Box >
                <AppBarred isLoggedin={isLoggedin} />
                <Box className="main-content">
                    <Typography style={{ textAlign: 'center' }} component="h2" variant="subtitle2">
                        Add a Book:
                    </Typography>
                    <Grid
                        container
                        alignContent="center"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <form
                            //  method="post" action="/datas"
                            onSubmit={event => handleSubmit(event)}
                        >
                            <FormControl><TextField
                                label="Book Name"
                                variant="outlined"
                                type="text"
                                name="name"
                                required
                                value={values.name}
                                onChange={handleChange('name')}
                                lang="en"
                                fullWidth
                                style={{ margin: 8 }}
                            /></FormControl>
                            <br />
                            <FormControl><TextField
                                label="Author"
                                variant="outlined"
                                name="author"
                                value={values.author}
                                onChange={handleChange('author')}
                                type="text"
                                required
                                lang="en"
                                fullWidth
                                style={{ margin: 8 }}
                            /></FormControl>
                            <br />

                            <FormControl><TextField
                                label="Description"
                                variant="outlined"
                                name="description"
                                value={values.description}
                                onChange={handleChange('description')}
                                multiline
                                fullWidth
                                rows={3}
                                type="text"
                                required
                                lang="en"
                                style={{ margin: 8 }}
                            /></FormControl>
                            <br />
                            <FormControl><TextField
                                label="Original Price"
                                variant="outlined"
                                value={values.originalPrice}
                                onChange={handleChange('originalPrice')}
                                type="number"
                                name="originalPrice"
                                required
                                lang="en"
                                fullWidth
                                style={{ margin: 8 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <strong>Rs.</strong>
                                        </InputAdornment>
                                    ),
                                }}
                            /></FormControl>
                            <br />
                            <FormControl><TextField
                                label="Price"
                                variant="outlined"
                                type="number"
                                name="discountedPrice"
                                required
                                value={values.discountedPrice}
                                onChange={handleChange('discountedPrice')}
                                lang="en"
                                fullWidth
                                style={{ margin: 8 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <strong>Rs.</strong>
                                        </InputAdornment>
                                    ),
                                }}
                            /></FormControl>
                            <br />
                            <Tags />

                            <Typography component="strong" variant="subtitle2" >
                                Image:
                            </Typography>
                            <input
                                accept="image/*"
                                name="image"
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                type="file"
                                value={values.image}
                                onChange={handleChange('image')}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Upload
        </Button>
                            </label>
                            <br />
                            <br />
                            {isLoggedin ? <FormControl>
                                <Button type="submit" color="secondary" variant="outlined">Submit</Button>
                            </FormControl> : <Container>
                                    <Button disabled color="secondary" variant="outlined">Submit</Button>
                                    <Typography component="p" variant="caption">
                                        Please <Link to={"/login"}> Login </Link>First To Submit</Typography>
                                </Container>}
                        </form>
                    </Grid>
                </Box>
            </Box>
            <Navigation />
        </Box>
    );
}
