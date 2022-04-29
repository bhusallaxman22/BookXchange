// // Books description from data.js in material ui
import React from 'react';
import RelatedBooks from '../RelatedBooks/RelatedBooks';
import { useParams } from 'react-router-dom';
// import data from "../data"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import ShareBut from './ShareBut';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const imageStyle = { maxHeight: '500px', width: '100%' }
const marginBalanced = { margin: '5px' }
const marginBalancedTop = { margin: '15px 5px 5px 5px' }
const root = { flexGrow: 1, padding: '0px', margin: '0px', height: "95vh", overflowY: "scroll" }
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function Description(props) {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(id)
  useEffect(() => {
    axios.post("api/v1/book", {
      id: id
    })
      .then(res => {
        console.log("single book", res.data)
        setBook(res.data)
        setLoading(false)
      })
      .catch(err => console.log(err))

  }, [id])



  return (
    <div>
      <Box sx={{ flexGrow: 1 }} style={root}>
        {!loading ? (book.map(book => (
          <div key={book.id}>
            <Typography variant="h4" align="center" style={{ margin: '15px', textTransform: 'uppercase' }}>{book.bname}</Typography>
            <Grid container spacing={2}>

              <Grid item xs={12} lg={5}>
                <Item>
                  <img alt={book.bname} src={book.image} style={imageStyle} />
                </Item>
              </Grid>
              <Grid item xs={12} lg={7}>

                <h4 style={marginBalancedTop}><b style={{ color: '#1976D2' }}>Author:</b> {book.author}</h4>
                <h4 style={marginBalanced}><b style={{ color: '#1976D2' }}>Publication:</b> {book.publication}</h4>
                {/* <h4 style={marginBalanced}><b style={{ color: '#1976D2' }}>Categories:</b> {book.category.map(data => <span key={data.id}>{data.category} </span>)} </h4> */}
                {/* <h4 style={marginBalanced}><b style={{ color: '#1976D2' }}>Sub Category:</b> {book.category.map(data => <span key={data.id}>{data.subcategory} </span>)} </h4> */}
                <h3 style={marginBalanced}><b style={{ color: '#1976D2' }}>Credit:</b> {book.credit}</h3>
                <h3 style={marginBalanced}><b style={{ color: '#1976D2' }}>Description:</b>{book.description}</h3>
                <p style={marginBalanced}>{book.description}</p>
                {/* <h4 style={marginBalancedTop}><b style={{ color: '#1976D2' }}>Book Posted By:</b>{book.postedBy} </h4> */}
                <ShareBut />
                <Button variant="contained" onClick={() => props.addToCart(book)} style={{ margin: '5px' }} endIcon={<AddShoppingCart />}>
                  Add To Cart
                </Button>
              </Grid>
            </Grid>

          </div>
        ))
        ) : (
          <div>Loading...</div>
        )}
        <Typography variant="h4" align="center" style={{ margin: '15px' }}>RELATED BOOKS</Typography>
        <Box maxWidth="lg" style={{ margin: "10px 10px 10px 10px" }}>
          <Typography variant="h6" component="h2" gutterBottom>
          </Typography>
          <RelatedBooks props={props} addToCart={props.addToCart} book={book} />
        </Box>
        <Typography variant="h4" align="center" style={{ margin: '15px' }}>DISCUSSIONS</Typography>
      </Box>

    </div>

  );
}


export default Description;
