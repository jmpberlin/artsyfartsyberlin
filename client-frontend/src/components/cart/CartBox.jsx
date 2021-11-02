import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartSum from './CartSum';

const CartBox = () => {
  const [cartArr, setCartArr] = useState([]);
  const [updatedCart, setUpdatedCart] = useState(true);

  useEffect(() => {
    axios.get('/items/userOrder').then((resFromDb) => {
      if (resFromDb.data.items !== undefined) {
        setCartArr(resFromDb.data.items);
      } else {
        setCartArr([]);
      }
    });
  }, [updatedCart]);
  const decreaseQuantity = (obj) => {
    axios.post('/items/setQuantityOfCartItem', { obj }).then((resFromDb) => {
      setUpdatedCart(!updatedCart);
    });
  };
  const increaseQuantity = (obj) => {
    axios.post('/items/setQuantityOfCartItem', { obj }).then((resFromDb) => {
      setUpdatedCart(!updatedCart);
    });
  };

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
              decQuantity={decreaseQuantity}
              incQuantity={increaseQuantity}
            ></CartItem>
          );
        })}
      </div>

      <CartSum items={cartArr}></CartSum>
    </>
  );
};

export default CartBox;
