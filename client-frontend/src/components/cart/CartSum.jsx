import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { formatPrice } from '../../Utility/scripts/functions';
import AuthContext from '../../store/auth-context';

const CartSum = (props) => {
  const ctx = useContext(AuthContext);
  let sum = 0;
  props.items.forEach((item) => {
    sum += item.item.price * item.quantity;
  });
  const formattedSum = formatPrice(sum);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    axios.get('checkuser').then((resFromDb) => {
      if (resFromDb.data.currentUser !== null) {
        setShowAlert(false);
      }
    });
  }, []);
  // STRIPE DOESNT WORK AS AXIOS REQUEST
  // const checkoutClickHandler = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post('/stripe/create-checkout-session', { price: sum })
  //     .then((resFromStripe) => {
  //       console.log(resFromStripe.data.url);
  //       props.passStripeUrl(resFromStripe.data.url);
  //     });
  // };
  return (
    <>
      <div className='borderbox flexwrapper flex-col'>
        <h4>Summed: </h4>
        <h4>{formattedSum}</h4>
        <div>
          <form action='/stripe/create-checkout-session' method='POST'>
            {showAlert ? (
              <p className='text-xs bg-red-50 border text-red-600 rounded'>
                You are currently not logged in. Please Log in to proceed to
                Paypment
              </p>
            ) : (
              <button
                disabled={ctx.isLoggedIn ? false : true}
                // onClick={checkoutClickHandler}
                type='submit'
                className='logo gradient hover:bg-gray-400 p-2 sm:p-3 md:p-4'
              >
                Continue to Checkout
              </button>
            )}
          </form>
          {ctx.isLoggedIn && <h1>Hallo from "isLoggedIn"</h1>}
          {!ctx.isLoggedIn && (
            <button onClick={ctx.onLogin}>Click Me to Show! </button>
          )}
          {ctx.isLoggedIn && (
            <button onClick={ctx.onLogout}>Click Me to Hide </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSum;
