import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';

const CartBox = () => {
  const [cartArr, setCartArr] = useState([]);

  useEffect(() => {
    axios.get('/items/userOrder').then((resFromDb) => {
      if (resFromDb.data.items !== undefined) {
        setCartArr(resFromDb.data.items);
      } else {
        setCartArr([]);
      }
    });
  }, []);

  if (cartArr.length === 0) {
    return (
      <div className=''>
        <h4>Your Cart is currently empty!</h4>
      </div>
    );
  }
  return (
    <>
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
      <div className='borderbox flexwrapper flex-col'>
        <h2>here goes the calculator</h2>
      </div>
    </>
  );
};

export default CartBox;
