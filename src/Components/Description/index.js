// Books description from data.js in material ui
import React from 'react';
import { makeStyles } from '@mui/styles';
import {Grid,Typography} from "@mui/material"
import RelatedBooks from '../RelatedBooks/RelatedBooks';
import AppBarHome from '../AppBar/AppBarHome';
import { useParams } from 'react-router-dom';
import data from "../data"
// Styles
const useStyles = makeStyles(theme => ({
      root: {
    flexGrow: 1,
    height: '95vh',
    padding: '0px',
    margin: '0px',
    overflow: 'hidden',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
// const book = 
//     {
//         id: 1,
//         name: "Engineering Mathematics",
//         description: "Text Book of engineering mathematics 1st semester of Tribhuvan University.",
//         Publication: "K.E.C",
//         image: "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2021/06/how-to-write-a-book.jpeg",
//         year_sem: "2nd",
//         faculty: "Engineering",
//         sub_faculty: [
//             "Civil", "Computer", "Industrial", "Automobile"
//         ],
//         discountedPrice: 200,
//         postedBy: "Laxman Bhusal",
//     }

// filter the books based on the id

// Component
function Description(props) {
  const classes = useStyles();
const {id} = useParams();
  const book = data.filter(book => book.id === parseInt(id))[0];
console.log("fish", book);
  return (
    <div className={classes.root}>
                    <AppBarHome
                    isLoggedin={props.isLoggedin}
                    Cart={props.Cart}
                    setCart={props.setCart}
                />
      <Grid container spacing={3}>
        
          <Grid item xs={12} sm={6} key={book.id}>
            <Typography variant="h5" component="h3">
              {book.name}
            </Typography>
            <Typography component="p">{book.description}</Typography>
          </Grid>
      </Grid>
      <Typography variant="h5" component="h3">
        Related Books
      </Typography>

      <RelatedBooks props={props} addToCart={props.addToCart} book={book}  />
    </div>
  );
};

export default Description;