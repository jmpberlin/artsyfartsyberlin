import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';

const CartBox = () => {
  const [cartArr, setCartArr] = useState([]);

  useEffect(() => {
    axios.get('/items/sessionCart').then((resFromDb) => {
      if (resFromDb.data.sessionCart !== undefined) {
        setCartArr(resFromDb.data.sessionCart);
      } else {
        setCartArr([]);
      }
    });
  }, []);

  if (cartArr.length === 0) {
    return (
      <div className='borderbox flexwrapper flex-col'>
        <h4>Your Cart is currently empty!</h4>
      </div>
    );
  }
  return (
    <div>
      {cartArr.map((e) => {
        return (
          <CartItem
            item={e.item}
            quantity={e.quantity}
            key={e.item.articleNumber}
          ></CartItem>
        );
      })}
    </div>
  );
};

export default CartBox;
