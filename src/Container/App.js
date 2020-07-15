import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import {
  orange,
  blue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";
import Home from '../Components/Home/Home';
import Profile from '../Components/Profile/Profile';
import Add from '../Components/Add/Add';
import Login from '../Components/Login/Login';
// import books from '../Components/data';
import SignUp from '../Components/Login/SignUp';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import MyBooks from '../Components/Profile/myBooks';
import Edit from '../Components/Profile/Edit';
import { chain } from "lodash";
// import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
// import data from '../Components/data'
import UserProfile from '../Components/UserProfile/UserProfile';
import Category from '../Components/Category/Category';


const GRAPH_DATA =
  gql`
  {
    books {
      id
      name
      genre
      author
      postedBy{
        id
        firstName
        lastName
        bookSet{
          name
        }
      }
      description
      originalPrice
      discountedPrice
    }
  }
    `

function App() {
  const [darkState, setDarkState] = useState(false);
  const [isLoggedin, setLogin] = useState(false);
  const [SearchField, setSearchField] = useState('');
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : blue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

  // FOR HOME.JSX
  const [datas, setdata] = useState([]);
  const [Cart, setCart] = useState([]);
  const [Wish, setWish] = useState([]);
  const [category, setCategory] = useState('All');

  const unique = chain(datas).map('genre').flatten().uniq().value();
  // unique.push('All')
  const filteredResult = datas.filter((item) =>
    category === 'All' ? datas : (item.genre.indexOf(category) >= 0)
  );

  //GET USER INFO.
  const [userInfo, setUser] = useState([]);

  const { loading, error, data } = useQuery(GRAPH_DATA);
  let graphBook;
  if (!loading) graphBook = data;

  useEffect(() => {
    var aaa = localStorage.getItem("dark");
    console.log("darkmode state from localStorage:", aaa);
    aaa === null ? aaa = false : setDarkState(JSON.parse(aaa));
    graphBook !== undefined ? setdata(graphBook.books) : setdata([])
  }, [graphBook])

  const addToCart = (data) => {
    const newCart = [...Cart, data];
    setCart(newCart);
    console.log(newCart);
  }
  const addToWish = data => {
    const newWish = [...Wish, data];
    setWish(newWish);
    console.log(newWish);
  }

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });
  const filteredBooks = filteredResult.filter(book => {
    return book.name.toLowerCase().includes(SearchField.toLowerCase());
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
    localStorage.setItem("dark", !darkState);
  };
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              isLoggedin={isLoggedin}
              setLogin={setLogin}
              datas={filteredBooks}
              Cart={Cart}
              unique={unique}
              Wish={Wish}
              addToCart={addToCart}
              addToWish={addToWish}
              setCart={setCart}
              setWish={setWish}
              category={category}
              setCategory={setCategory}
              setSearchField={setSearchField}
              filteredResults={filteredResult}
            // error={error}
            // loading={loading}
            />
          </Route>
          <Route path="/profile">
            <Profile darkState={darkState} handleThemeChange={handleThemeChange} isLoggedin={isLoggedin} setLogin={setLogin} />
          </Route>
          <Route path="/add">
            <Add isLoggedin={isLoggedin} setLogin={setLogin} />
          </Route>
          <Route path="/login">
            <Login
              userInfo={userInfo}
              setUser={setUser}
              isLoggedin={isLoggedin}
              setLogin={setLogin}
            />
          </Route>
          <Route path="/signup">
            <SignUp isLoggedin={isLoggedin} setLogin={setLogin} />
          </Route>
          <Route path="/myBooks">
            <MyBooks />
          </Route>
          <Route path="/edit" >
            <Edit />
          </Route>
          <Route path="/user/:id" >
            <UserProfile data={datas} />
          </Route>
          <Route path="/categories" >
            <Category isLoggedin={isLoggedin} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
export default App;
