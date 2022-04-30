import React from 'react';
import Box from "@mui/material/Box";
import { Typography, Grid, TextField, Button, Container } from '@mui/material';
// import data from '../data';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
export default function Add({ userInfo }) {
    const marginCont = { margin: '8px' }
    const mainStyle = { height: "88vh", width: "100%", overflow: "scroll" }
    const history = useHistory();
    const [cover, setCever] = React.useState();
    const [values, setValues] = React.useState({
        bname: '',
        description: '',
        author: '',
        revision: "",
        category: "",
        subcategory: "",
        publication: "",
        image: "",
        postedBy: `${localStorage.getItem('userName')}`,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { bname, description, author, revision, publication, category, subcategory } = values;
        const uid = userInfo.id

        const formData = new FormData();
        // formData.append('cover', cover);
        formData.append('bname', bname);
        formData.append('description', description);
        formData.append('author', author);
        formData.append('revision', revision);
        formData.append('publication', publication);
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('credit', 10);
        formData.append("user", uid);
        formData.append('image', cover, cover.image);
        axios.post('/api/v1/create/book', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res);
                history.push('/profile');
            })
            .catch(err => {
                console.log(err);
            });

    };

    return (
        <Box style={mainStyle}>
            <Box >
                {/* <AppBarred isLoggedin={isLoggedin} /> */}
                <Container className="main-content" >
                    <Grid
                        container
                        alignContent="center"
                        alignItems="center"
                        justifyContent="center"
                    >

                        <form
                            //  method="post" action="/datas"
                            onSubmit={event => handleSubmit(event)} style={{ padding: '15px', width: '90%' }}
                        >
                            <Typography component="h2" variant="subtitle">
                                Add a Book:
                            </Typography>
                            {/*  TextField bname ,description,author,category,postedBy,*/}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="bname"
                                        label="Book Name"
                                        variant="outlined"
                                        fullWidth
                                        value={values.bname}
                                        onChange={handleChange('bname')}
                                        style={marginCont}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="author"
                                        label="Author"
                                        variant="outlined"
                                        fullWidth
                                        value={values.author}
                                        onChange={handleChange('author')}
                                        style={marginCont}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="revision"
                                        label="Revision"
                                        variant="outlined"
                                        fullWidth
                                        value={values.revision}
                                        onChange={handleChange('revision')}
                                        style={marginCont}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="publication"
                                        label="Publication"
                                        variant="outlined"
                                        fullWidth
                                        value={values.publication}
                                        onChange={handleChange('publication')}
                                        style={marginCont}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="description"
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        value={values.description}
                                        onChange={handleChange('description')}
                                        style={marginCont}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="category"
                                        label="Category"
                                        variant="outlined"
                                        fullWidth
                                        value={values.category}
                                        onChange={handleChange('category')}
                                        style={marginCont}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="subcategory"
                                        label="Sub Category"
                                        variant="outlined"
                                        fullWidth
                                        value={values.subcategory}
                                        onChange={handleChange('subcategory')}
                                        style={marginCont}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="h2" variant="subtitle">
                                        Image:
                                    </Typography>
                                    <TextField
                                        id="image"
                                        variant="outlined"
                                        type={"file"}
                                        fullWidth
                                        onChange={e => setCever(e.target.files[0])}
                                        style={marginCont}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '10px' }}
                                >
                                    Add Book
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
