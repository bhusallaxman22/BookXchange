// Books description from data.js in material ui
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, Box, Container, } from "@mui/material"
import RelatedBooks from '../RelatedBooks/RelatedBooks';
import AppBarHome from '../AppBar/AppBarHome';
import { useParams } from 'react-router-dom';
import data from "../data"
// Styles
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '0px',
    margin: '0px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
function Description(props) {
  const classes = useStyles();
  const { id } = useParams();
  const book = data.filter(book => book.id === parseInt(id))[0];
  console.log("fish", book);

  // product description like amazon product description, image zooms onHover, and related books
  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={1} m={1}>
            <img src={book.image} alt="book" width="100%" height="100%" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column"  p={1} m={1}>
              <Typography variant="h4" component="h1" gutterBottom>
                {book.name}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                {book.description}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                Publication: {book.Publication}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                Year: {book.year_sem}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                Faculty: {book.faculty}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                Sub-Faculty: {book.sub_faculty}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                Price: {book.discountedPrice}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                Posted By: {book.postedBy}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Typography variant="h6" component="h2" gutterBottom>
        Related Books
      </Typography>
      <RelatedBooks props={props} addToCart={props.addToCart} book={book} /> 
    </Box>
  );
}


export default Description;

