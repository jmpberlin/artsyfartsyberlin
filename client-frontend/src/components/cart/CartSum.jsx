import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatPrice } from '../../Utility/scripts/functions';

const CartSum = (props) => {
  let sum = 0;
  props.items.forEach((item) => {
    sum += item.item.price * item.quantity;
  });
  const formattedSum = formatPrice(sum);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    axios.get('/isUserLoggedIn').then((resFromDb) => {
      if (resFromDb.data.loggedIn) {
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
                // onClick={checkoutClickHandler}
                type='submit'
                className='logo gradient hover:bg-gray-400 p-2 sm:p-3 md:p-4'
              >
                Continue to Checkout
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CartSum;
