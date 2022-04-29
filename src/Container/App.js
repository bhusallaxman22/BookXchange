import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, } from 'react-router-dom'
import {
  orange,
  blue,
  deepPurple,
  deepOrange
} from "@mui/material/colors";
import Home from '../Components/Home/Home';
import Profile from '../Components/Profile/Profile';
import Add from '../Components/Add/Add';
import Login from '../Components/Login/Login';
// import books from '../Components/data';
import SignUp from '../Components/Login/SignUp';
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
  CssBaseline,

} from '@mui/material';
import CheckOut from "../Components/CheckOut/CheckOut";
import axios from 'axios';
import MyBooks from '../Components/Profile/myBooks';
import Edit from '../Components/Profile/Edit';
import { chain } from "lodash";
import UserProfile from '../Components/UserProfile/UserProfile';
import Category from '../Components/Category/Category';
import Navigation from '../Components/Navigation/Navigation';
import Fuse from 'fuse.js';
import Categorised from '../Components/Category/Categorised';
import Description from '../Components/Description';
import Single from '../Components/Single'
import AppBarHome from '../Components/AppBar/AppBarHome';

function App() {
  const [darkState, setDarkState] = useState(false);
  const [isLoggedin, setLogin] = useState(false);
  // const [SearchField, setSearchField] = useState('');
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : blue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const [searchResult, setSearchResult] = useState([]);
  // FOR HOME.JSX
  const [datas, setData] = useState([]);
  const [Cart, setCart] = useState([]);
  const [category, setCategory] = useState('All');

  const unique = chain(datas).map('category').flatten().uniq().value();
  const filteredResult = datas.filter((item) =>
    category === 'All' ? datas : (item.category === category)
  );

  //GET USER INFO.
  const [userInfo, setUser] = useState(null);
  let loading, error;
  useEffect(() => {
    var aaa = localStorage.getItem("dark");
    console.log("darkmode state from localStorage:", aaa);
    aaa === null ? aaa = false : setDarkState(JSON.parse(aaa));
    // get books from api/v1/books
    axios
      .get('/api/v1/books')
      .then((res) => {
        // setData(res.data.data);
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    // setData(books);
    console.log(localStorage.getItem('token'));
    axios.get('/api/v1/account/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log(res.data)
        if (res.status === 200) {
          setUser(res.data)
          localStorage.setItem("userName", res.data.first_tname + " " + res.data.last_name)
          setLogin(true)
        }
        else {
          setLogin(false)
          setUser(null)
        }
      })
      .catch(err => {
        console.log(err)
        setLogin(false)
      }
      )

  }, [])
  console.log(datas)
  const addToCart = (data) => {



    const newCart = [...Cart, data];
    // donot add data with same id
    const uniqueCart = newCart.filter((item, index) => {
      return newCart.indexOf(item) === index;
    });
    setCart(uniqueCart);
  }

  const darkTheme = createTheme({
    palette: {
      mode: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });
  const fuse = new Fuse(filteredResult, {
    keys: ["bname", "category", "subcategory", "description", "author",],
    includeScore: true,
    threshold: 0.3,
  });
  const onChangeSearch = (e) => {
    // setSearch(e.target.value);
    setSearchResult(fuse.search(e.target.value));
  };

  const sBook =
    searchResult.length > 0 ? searchResult.map((book) => book.item) : filteredResult;
  const handleThemeChange = () => {
    setDarkState(!darkState);
    localStorage.setItem("dark", !darkState);
  };
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
 
        <Router>
          <AppBarHome isLoggedin={isLoggedin}

            Cart={Cart}
            setCart={setCart}
          />
          <Switch>

            <Route exact path="/">
              <Home
                isLoggedin={isLoggedin}
                setLogin={setLogin}
                datas={sBook}
                Cart={Cart}
                unique={unique}
                addToCart={addToCart}
                setCart={setCart}
                category={category}
                setCategory={setCategory}
                setSearchField={onChangeSearch}
                filteredResults={filteredResult}
              />
            </Route>
            <Route path="/profile">
              <Profile darkState={darkState} handleThemeChange={handleThemeChange} isLoggedin={isLoggedin} setLogin={setLogin} />
            </Route>
            <Route path="/add">
              <Add isLoggedin={isLoggedin} setLogin={setLogin} userInfo={userInfo} />
            </Route>
            <Route path="/login">
              <Login
                userInfo={userInfo}
                setUser={setUser}
                Cart={Cart}

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
            <Route path="/single">
              <Single />
            </Route>
            <Route path="/edit" >
              <Edit />
            </Route>
            <Route path="/checkout">
              <CheckOut isLoggedin={isLoggedin} userInfo={userInfo} />
            </Route>
            <Route path="/user/:id" >
              <UserProfile user={userInfo} setUser={setUser} />
            </Route>
            <Route path="/categories" >
              <Category isLoggedin={isLoggedin} />
            </Route>
            <Route path="/books/:id" >
              <Categorised isLoggedin={isLoggedin} data={datas} addToCart={addToCart}
                Cart={Cart}
                setCart={setCart}
              />
            </Route>
            <Route path="/book/:id" >
              <Description isLoggedin={isLoggedin} data={datas} addToCart={addToCart}
                Cart={Cart}
                setCart={setCart}
              />
            </Route>
          </Switch>
          <Navigation />
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
export default App;
