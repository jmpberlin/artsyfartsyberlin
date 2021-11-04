import './App.css';
import MainNavbar from './components/navbar/MainNavbar';
import { Switch, Route } from 'react-router-dom';
import ItemBox from './components/items/ItemBox';
import { useState } from 'react';
import CartBox from './components/cart/CartBox';
import axios from 'axios';

function App(props) {
  const [passedItem, setPassedItem] = useState();
  const [itemCartCount, setItemCartCount] = useState();
  const passCartLength = (cartLength) => {
    setItemCartCount(cartLength);
  };
  const addToCartHandler = (itemToAdd) => {
    setPassedItem({ itemToAdd });

    axios
      .get('/checkuser')
      .then((receivedUser) => {
        return receivedUser;
      })
      .then((userFromBefore) => {
        // HERE COMES THE ROUTE FOR SAVING SOMETHING IN AN ORDER

        axios.post('/items/addToOrder', itemToAdd).then((resFromDb) => {
          console.log(resFromDb.data.cartLength);
          setItemCartCount(resFromDb.data.cartLength);
        });
      });
  };
  return (
    <div>
      <MainNavbar
        currentUser={props.currentUser}
        itemCartCount={itemCartCount}
      ></MainNavbar>
      <Switch>
        <Route
          exact
          path='/cart'
          component={() => (
            <CartBox
              passCartLenght={passCartLength}
              passedItem={passedItem}
            ></CartBox>
          )}
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
