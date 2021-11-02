import React, { useEffect } from 'react';
import axios from 'axios';

const CartItem = (props) => {
  const priceCalculator = (cents) => {
    if (cents % 10 === 0) {
      return cents / 100 + '.' + '00' + ' €';
    } else {
      return cents / 100 + ' €';
    }
  };
  useEffect(() => {}, []);

  const increaseHandler = (quantityToInc) => {
    props.incQuantity(quantityToInc);
  };
  const decreaseHandler = (quantityToDec) => {
    props.decQuantity(quantityToDec);
  };
  return (
    <div className='borderbox flexwrapper flex-row'>
      <div className='hover:bg-green-400 p-2 sm:p-3 md:p-4 border-2 rounded-md'>
        {props.item.name}
      </div>

      <div className='hover:bg-green-400 p-2 sm:p-3 md:p-4'>
        {priceCalculator(props.item.price)}
      </div>

      <div className='flex row'>
        <button
          onClick={() => {
            decreaseHandler({
              quantity: props.quantity - 1,
              item: props.item._id,
            });
          }}
          className='rounded-full p-2 border-2 hover:bg-green-400'
        >
          -
        </button>

        <div className='inline-block p-2 m-2 '>{props.quantity}</div>

        <button
          onClick={() => {
            increaseHandler({
              quantity: props.quantity + 1,
              item: props.item._id,
            });
          }}
          className='rounded-full p-2 border-2 hover:bg-green-400'
        >
          +
        </button>
      </div>

      <div className='hover:bg-green-400 p-2 sm:p-3 md:p-4 border-2 rounded-md'>
        {priceCalculator(props.item.price * props.quantity)}
      </div>
    </div>
  );
};

export default CartItem;
