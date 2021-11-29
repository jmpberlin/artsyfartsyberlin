import './App.css';
import MainNavbar from './components/navbar/MainNavbar';
import { Switch, Route } from 'react-router-dom';
import ItemBox from './components/items/ItemBox';
import { useState, useEffect } from 'react';
import CartBox from './components/cart/CartBox';
import axios from 'axios';
import PaymentCancel from './components/pay-gateway/PaymentCancel';
import PaymentSuccess from './components/pay-gateway/PaymentSuccess';

import DetailItem from './components/items/DetailItem';
import UserProfile from './components/user-profile/UserProfile';
import StoreDashboard from './components/admin/storemanagement/StoreDashboard';

function App(props) {
  const [allItems, setAllItems] = useState([]);
  const [passedItem, setPassedItem] = useState();
  const [itemCartCount, setItemCartCount] = useState();
  const [noArticlesFound, setNoArticlesFound] = useState(false);
  const passCartLength = (cartLength) => {
    setItemCartCount(cartLength);
  };
  useEffect(() => {
    axios.get('/api/items/allItems').then((resFromDb) => {
      setAllItems(resFromDb.data);
    });
  }, []);
  const addToCartHandler = (itemToAdd) => {
    setPassedItem({ itemToAdd });
    axios.post('/api/items/addToOrder', itemToAdd).then((resFromDb) => {
      setItemCartCount(resFromDb.data.cartLength);
    });
  };

  const receiveArticlesAndSetState = (articles) => {
    setAllItems(articles);
    if (articles.length === 0) {
      setNoArticlesFound(true);
    }
  };
  return (
    <div>
      <MainNavbar
        receiveArticlesFromNavbar={receiveArticlesAndSetState}
        currentUser={props.currentUser}
        itemCartCount={itemCartCount}
      ></MainNavbar>

      <Switch>
        <Route exact path='/users/:id' component={UserProfile}></Route>
        <Route
          exact
          path='/users/:id/manageStore'
          component={(props) => {
            return <StoreDashboard {...props}></StoreDashboard>;
          }}
        ></Route>
        <Route
          exact
          path='/item/:id'
          component={(props) => {
            return (
              <DetailItem
                {...props}
                onAddHandler={addToCartHandler}
              ></DetailItem>
            );
          }}
        ></Route>
        <Route
          exact
          path='/cart'
          component={() => (
            <CartBox
              currentUser={props.currentUser}
              passCartLenght={passCartLength}
              passedItem={passedItem}
            ></CartBox>
          )}
        ></Route>
        <Route
          path='/'
          exact
          component={() => (
            <ItemBox
              articles={allItems}
              addToCart={addToCartHandler}
              show={noArticlesFound}
            ></ItemBox>
          )}
        ></Route>
        <Route
          component={PaymentSuccess}
          path='/stripe/order/success'
          exact
        ></Route>
        <Route
          component={PaymentCancel}
          path='/stripe/order/cancel'
          exact
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
