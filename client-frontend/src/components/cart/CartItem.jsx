import React from 'react';

const CartItem = (props) => {
  const priceCalculator = (cents) => {
    if (cents % 10 === 0) {
      return cents / 100 + '.' + '00' + ' €';
    } else {
      return cents / 100 + ' €';
    }
  };

  return (
    <div className='borderbox flexwrapper flex-row'>
      <div className='hover:bg-green-400 p-2 sm:p-3 md:p-4 border-2 rounded-md'>
        {props.item.name}
      </div>

      <div className='hover:bg-green-400 p-2 sm:p-3 md:p-4'>
        {priceCalculator(props.item.price)}
      </div>
      <div className='hover:bg-green-400 p-2 sm:p-3 md:p-4'>
        <p>x {props.quantity}</p>
      </div>

      <div className='hover:bg-green-400 p-2 sm:p-3 md:p-4 border-2 rounded-md'>
        {priceCalculator(props.item.price * props.quantity)}
      </div>
    </div>
  );
};

export default CartItem;
