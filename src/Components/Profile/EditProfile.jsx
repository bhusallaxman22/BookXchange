// Edit Profile info and send post request to api/v1/account/profile/edit
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Grid, Typography, TextField, Button, FormControl, InputAdornment } from '@mui/material';
import axios from 'axios';

function EditProfile(props) {
    const location = useLocation();
    const history = useHistory();
    const hmmp = location.state
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        note: "",
    }
    )
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('phone', values.phone);
        formData.append('note', values.note);

        axios.post('/api/v1/account/profile/edit', {
            formData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                history.push('/profile');
            }
            )
            .catch(err => {
                console.log(err);
            }
            )
    }
    return hmmp !== undefined ? <Box>
        <Box>
            <Box className="main-content" style={{ height: "88vh", width: "100%", overflow: "scroll" }}>
                <Typography style={{ textAlign: 'center' }} component="h2" variant="subtitle">
                    Edit Profile:
                </Typography>
                <Grid
                    container
                    alignContent="center"
                    alignItems="center"
                    justifyContent="center"
                >
                    <form onSubmit={handleSubmit}>
                        <FormControl><TextField
                            label="First Name"
                            variant="outlined"
                            type="text"
                            required
                            value={values.first_name}
                            onChange={handleChange('first_name')}
                            lang="en"
                            fullWidth
                            style={{ margin: 8 }}
                        /></FormControl>
                        <br />
                        <FormControl><TextField
                            label="Last Name"
                            variant="outlined"
                            type="text"
                            required
                            value={values.last_name}
                            onChange={handleChange('last_name')}
                            lang="en"
                            fullWidth
                            style={{ margin: 8 }}
                        /></FormControl>
                        <br />
                        <FormControl><TextField

                            label="Phone"
                            variant="outlined"
                            type="text"
                            required
                            value={values.phone}
                            onChange={handleChange('phone')}
                            lang="en"
                            fullWidth
                            style={{ margin: 8 }}
                        /></FormControl>
                        <br />
                        <FormControl><TextField
                            label="Note"
                            variant="outlined"
                            type="text"
                            required
                            value={values.note}
                            onChange={handleChange('note')}
                            lang="en"
                            fullWidth
                            style={{ margin: 8 }}
                        /></FormControl>
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ margin: 8 }}
                        >
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Box>
        </Box>
    </Box> : <Box>
        <Box>
            <Typography style={{ textAlign: 'center' }} component="h2" variant="subtitle">
                Loading
            </Typography>
        </Box>
    </Box>
}
export default EditProfile;



