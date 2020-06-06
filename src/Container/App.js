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
import books from '../Components/data';
import SignUp from '../Components/Login/SignUp';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import MyBooks from '../Components/Profile/myBooks';
import Edit from '../Components/Profile/Edit';
import _ from "lodash";
// import data from '../Components/data'
function App() {
  const [darkState, setDarkState] = useState(false);
  const [isLoggedin, setLogin] = useState(true);
  const [SearchField, setSearchField] = useState('');
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : blue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

  // FOR HOME.JSX
  const [datas, setdata] = useState([]);
  const [Cart, setCart] = useState([]);
  const [Wish, setWish] = useState([])
  const [category, setCategory] = useState('All')

  const unique =    _.chain(datas).map('genre').flatten().uniq().value()
  // unique.push('All')
  const filteredResult = datas.filter((item) =>
      category==='All'?datas: (item.genre.indexOf(category) >= 0)
  );
  useEffect(() => {
    var aaa = localStorage.getItem("dark");
    // fetch('/datas')
    //   .then(res => res.json())
    //   .then(books => setdata(books))
    //   .catch(err => console.log(err))
    setdata(books);
    console.log("darkmode state from localStorage:", aaa)
    aaa === null ? aaa = false : setDarkState(JSON.parse(aaa))
  }, [])

  const addToCart = (data) => {
    const newCart = [...Cart, data];
    setCart(newCart)
    console.log(newCart)
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
    return book.name.toLowerCase().includes(SearchField.toLowerCase())
  })
  const handleThemeChange = () => {
    setDarkState(!darkState);
    localStorage.setItem("dark", !darkState);
  };
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
              setCategory={setCategory}
              setSearchField={setSearchField}
              filteredResults={filteredResult}
            />
          </Route>
          <Route path="/profile">
            <Profile darkState={darkState} handleThemeChange={handleThemeChange} isLoggedin={isLoggedin} setLogin={setLogin} />
          </Route>
          <Route path="/add">
            <Add isLoggedin={isLoggedin} setLogin={setLogin} />
          </Route>
          <Route path="/login">
            <Login isLoggedin={isLoggedin} setLogin={setLogin} />
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
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
export default App;
