import React from 'react';
import Navigation from '../Navigation/Navigation';
import Box from "@material-ui/core/Box";
import AppBarred from '../AppBar/AppBarred';
import { Typography, Grid, TextField, Button, FormControl, InputAdornment, Container } from '@material-ui/core';
import data from '../data';
import { Link } from 'react-router-dom';
export default function Add({ isLoggedin }) {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        data.push(values);
        const empty =
        {
            name: '',
            description: '',
            author: '',
            originalPrice: '',
            discountedPrice: '',
            image: "",
            postedBy: 'Laxman Bhusal'
        }

        setValues(empty)
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
                        justify="center"
                    >
                        <form onSubmit={handleSubmit}>
                            <FormControl><TextField
                                label="Book Name"
                                variant="outlined"
                                type="text"
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
                            <Typography component="strong" variant="subtitle2" >
                                Image:
                            </Typography>
                            <input
                                accept="image/*"
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
    )
}
