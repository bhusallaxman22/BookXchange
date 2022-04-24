import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
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
import MyBooks from '../Components/Profile/myBooks';
import Edit from '../Components/Profile/Edit';
import { chain } from "lodash";
// import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';
import data from '../Components/data'
import UserProfile from '../Components/UserProfile/UserProfile';
import Category from '../Components/Category/Category';
import Navigation from '../Components/Navigation/Navigation';
import Fuse from 'fuse.js';
import Categorised from '../Components/Category/Categorised';
import Description  from '../Components/Description';

function App() {
  const [darkState, setDarkState] = useState(false);
  const [isLoggedin, setLogin] = useState(true);
  // const [SearchField, setSearchField] = useState('');
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : blue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const [searchResult, setSearchResult] = useState([]);

  // FOR HOME.JSX
  const [datas, setdata] = useState([]);
  const [Cart, setCart] = useState([]);
  const [category, setCategory] = useState('All');

  const unique = chain(datas).map('faculty').flatten().uniq().value();
  const filteredResult = datas.filter((item) =>
    category === 'All' ? data : (item.faculty === category)
  );

  //GET USER INFO.
  const [userInfo, setUser] = useState([]);

  let loading, error;
  // useQuery(GRAPH_DATA);
  // let graphBook;
  // if (!loading) graphBook = data;

  useEffect(() => {
    var aaa = localStorage.getItem("dark");
    console.log("darkmode state from localStorage:", aaa);
    aaa === null ? aaa = false : setDarkState(JSON.parse(aaa));
    setdata(data)
  }, [])

  const addToCart = (data) => {
    const newCart = [...Cart, data];
    // donot add data with samw id
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
    keys: ["name", "faculty", "sub_faculty", "description", "year_sem"],
    includeScore: true,
    threshold: 0.3,
  });
  const onChangeSearch = (e) => {
    // setSearch(e.target.value);
    setSearchResult(fuse.search(e.target.value));
  };

  const sBook =
    searchResult.length > 0 ? searchResult.map((book) => book.item) : filteredResult;
  // const filteredBooks = filteredResult.filter(book => {
  //   return book.name.toLowerCase().includes(SearchField.toLowerCase());
  // });
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
            <Route path="/books/:id" >
              <Categorised isLoggedin={isLoggedin} data={data} addToCart={addToCart}
                Cart={Cart}
                setCart={setCart}
                />
            </Route>
            <Route path="/book/:id" >
              <Description isLoggedin={isLoggedin} data={data} addToCart={addToCart}
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
