import React from 'react';
// import Navigation from '../Navigation/Navigation';
import Box from "@material-ui/core/Box";
import AppBarred from '../AppBar/AppBarred';
import { Typography, Grid, TextField, Button, FormControl, InputAdornment } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import EditError from './EditError';

export default function Add({ isLoggedin, props }) {
    const location = useLocation();
    const history = useHistory();
    const hmmp = location.state
    const [values, setValues] = React.useState({
        name: hmmp !== undefined ? hmmp.name : "",
        description: hmmp !== undefined ? hmmp.description : "",
        author: hmmp !== undefined ? hmmp.author : "",
        originalPrice: hmmp !== undefined ? hmmp.originalPrice : "",
        discountedPrice: hmmp !== undefined ? hmmp.discountedPrice : "",
        image: "",
        postedBy: 'Laxman Bhusal'
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(values);
        // data.push(values);
        history.push('/profile');
    }

    return (
        hmmp !== undefined ? < Box >
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
                            <FormControl>
                                <Button type="submit" color="secondary" variant="outlined">Submit</Button>
                            </FormControl>
                        </form>
                    </Grid>
                </Box>
            </Box>
        </Box > : <EditError />
    )

}