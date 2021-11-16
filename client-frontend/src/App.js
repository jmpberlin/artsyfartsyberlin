import './App.css';
import MainNavbar from './components/navbar/MainNavbar';
import { Switch, Route } from 'react-router-dom';
import ItemBox from './components/items/ItemBox';
import { useState, useEffect } from 'react';
import CartBox from './components/cart/CartBox';
import axios from 'axios';
import PaymentCancel from './components/pay-gateway/PaymentCancel';
import PaymentSuccess from './components/pay-gateway/PaymentSuccess';
import PaymentModal from './components/pay-gateway/PaymentModal/PaymentModal';
import DetailItem from './components/items/DetailItem';
import UserProfile from './components/user-profile/UserProfile';
import StoreDashboard from './components/admin/storemanagement/StoreDashboard';

function App(props) {
  const [allItems, setAllItems] = useState([]);
  const [passedItem, setPassedItem] = useState();
  const [itemCartCount, setItemCartCount] = useState();
  const [paymentModalUrl, setPaymentModalUrl] = useState(null);
  const [noArticlesFound, setNoArticlesFound] = useState(false);
  const passCartLength = (cartLength) => {
    setItemCartCount(cartLength);
  };
  useEffect(() => {
    axios.get('/items/allItems').then((resFromDb) => {
      setAllItems(resFromDb.data);
    });
  }, []);
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
          setItemCartCount(resFromDb.data.cartLength);
        });
      });
  };
  const passStripeUrlHandler = (url) => {
    console.log('this is the Stripe Url in the App component ');
    console.log(url);
    setPaymentModalUrl(url);
  };
  const hidePaymentModalHandler = () => {
    setPaymentModalUrl(null);
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
      {paymentModalUrl && (
        <PaymentModal
          url={paymentModalUrl}
          hideOverlay={hidePaymentModalHandler}
        ></PaymentModal>
      )}
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
              passStripeUrl={passStripeUrlHandler}
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
        <Route component={PaymentSuccess} path='/success' exact></Route>
        <Route component={PaymentCancel} path='/cancel' exact></Route>
      </Switch>
    </div>
  );
}

export default App;
