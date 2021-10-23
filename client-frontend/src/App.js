import './App.css';
import MainNavbar from './components/navbar/MainNavbar';
import { Switch, Route } from 'react-router-dom';
import ItemBox from './components/items/ItemBox';
import { useState } from 'react';
import CartBox from './components/cart/CartBox';
import axios from 'axios';

function App(props) {
  const [passedItem, setPassedItem] = useState();
  const addToCartHandler = (itemToAdd) => {
    setPassedItem({ itemToAdd });
    axios
      .post('/items/addToCart', itemToAdd)
      .then((resFromDb) => {})
      .catch((err) => console.log('this is error caught on front-end:', err));
  };
  return (
    <div>
      <MainNavbar currentUser={props.currentUser}></MainNavbar>
      <Switch>
        <Route
          exact
          path='/cart'
          component={() => <CartBox passedItem={passedItem}></CartBox>}
        ></Route>
        <Route
          path='/'
          exact
          component={() => <ItemBox addToCart={addToCartHandler}></ItemBox>}
        ></Route>
        {/* <Route exact path='/testroute' component={() => <h1>Hallo</h1>}></Route> */}
      </Switch>
    </div>
  );
}

export default App;
