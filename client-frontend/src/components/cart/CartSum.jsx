import axios from 'axios';
import React from 'react';

const CartSum = (props) => {
  const priceCalculator = (cents) => {
    if (cents % 10 === 0) {
      return cents / 100 + '.' + '00' + ' €';
    } else {
      return cents / 100 + ' €';
    }
  };
  let sum = 0;
  props.items.forEach((item) => {
    sum += item.item.price * item.quantity;
  });
  const formattedSum = priceCalculator(sum);
  const checkoutClickHandler = (e) => {
    e.preventDefault();

    axios
      .post('/stripe/create-checkout-session', { price: sum })
      .then((resFromStripe) => {
        console.log(resFromStripe.data.url);
        props.passStripeUrl(resFromStripe.data.url);
      });
  };
  return (
    <>
      <div className='borderbox flexwrapper flex-col'>
        <h4>Summed: </h4>
        <h4>{formattedSum}</h4>
        <div>
          <form action='/stripe/create-checkout-session' method='POST'>
            <button
              // onClick={checkoutClickHandler}
              type='submit'
              className='logo gradient hover:bg-green-400 p-2 sm:p-3 md:p-4'
            >
              Continue to Checkout
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CartSum;
