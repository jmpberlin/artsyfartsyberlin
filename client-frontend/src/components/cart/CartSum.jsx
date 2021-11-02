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
  return (
    <div className='borderbox flexwrapper flex-col'>
      <h4>Summed: </h4>
      <h4>{formattedSum}</h4>
    </div>
  );
};

export default CartSum;
