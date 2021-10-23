import React from 'react';

const CartItem = (props) => {
  return (
    <div className='borderbox flexwrapper flex-col'>
      <h2>{props.item.name}</h2>
      <h2>{props.item.articleNumber}</h2>
      <h2>{props.quantity}</h2>
    </div>
  );
};

export default CartItem;
