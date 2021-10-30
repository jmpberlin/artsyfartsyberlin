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
      .get('/checkuser')
      .then((receivedUser) => {
        return receivedUser;
      })
      .then((userFromBefore) => {
        // HERE COMES THE ROUTE FOR SAVING SOMETHING IN AN ORDER
        console.log(itemToAdd);
        axios.post('/items/addToOrder', itemToAdd).then((resFromDb) => {
          console.log(resFromDb);
        });
        // ALL THE ROUTES FOR SAVING SOMETHING IN THE SESSION
        // if (userFromBefore.data.currentUser === null) {
        //   axios
        //     .post('/items/addToSessionCart', itemToAdd)
        //     .then((resFromDb) => {})
        //     .catch((err) =>
        //       console.log(
        //         'this is error caught on "add to session Cart path":',
        //         err
        //       )
        //     );
        // } else {
        //   let userId = userFromBefore.data.currentUser._id;
        //   itemToAdd.currentUser = userId;
        //   axios
        //     .post('/items/addToDbCart', itemToAdd)
        //     .then((resFromDb) => {})
        //     .catch((err) => {
        //       console.log('this is a error caught "add to db Cart path"', err);
        //     });
        // }
      });
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
