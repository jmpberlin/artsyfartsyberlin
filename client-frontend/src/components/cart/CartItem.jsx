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
  const deleteHandler = (articleId) => {
    props.deleteArticle(articleId);
  };
  return (
    <div className='flex justify-evenly flexwrapper flex-row mb-6'>
      <div className='hover:bg-green-400 p-2 sm:p-3 md:p-4 border-2 rounded-md'>
        <p className='text-xs'> {props.item.name}</p>
      </div>

      <div className='hover:bg-green-400 p-2 sm:p-3 md:p-4'>
        <p className='text-xs'> {priceCalculator(props.item.price)} </p>
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
          <p className='text-xs'>-</p>
        </button>

        <div className='inline-block p-2 m-2 '>
          <p className='text-xs'>{props.quantity}</p>
        </div>

        <button
          onClick={() => {
            increaseHandler({
              quantity: props.quantity + 1,
              item: props.item._id,
            });
          }}
          className='rounded-full p-2 border-2 hover:bg-green-400'
        >
          <p className='text-xs'>+</p>
        </button>
      </div>

      <div className='hover:bg-green-400 p-2 sm:p-3 md:p-4 border-2 rounded-md'>
        <p className='text-xs'>
          {priceCalculator(props.item.price * props.quantity)}
        </p>
      </div>
      <div
        onClick={() => {
          deleteHandler(props.item._id);
        }}
        className='hover:bg-green-400 p-2 sm:p-3 md:p-4 border-2 rounded-md'
      >
        <p className='text-xs'>X</p>
      </div>
    </div>
  );
};

export default CartItem;
