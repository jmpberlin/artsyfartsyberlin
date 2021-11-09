import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartSum from './CartSum';

const CartBox = (props) => {
  const [cartArr, setCartArr] = useState([]);
  const [updatedCart, setUpdatedCart] = useState(true);

  useEffect(() => {
    axios.get('/items/userOrder').then((resFromDb) => {
      if (resFromDb.data === null) {
        return;
      }
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
  const deleteHandler = (articleId) => {
    axios
      .post('/items/deleteFromCart', { articleId: articleId })
      .then((resFromDb) => {
        console.log(resFromDb);
        props.passCartLenght(resFromDb.data.cartLength);
        setUpdatedCart(!updatedCart);
      });
  };
  const passStripeUrlHandler = (url) => {
    console.log('this is the Stripe url in the Cartbox Component');
    console.log(url);
    props.passStripeUrl(url);
  };
  if (cartArr.length === 0) {
    return (
      <div className='m-2 p-2 sm:p-3 md:p-4 rounded border border-solid border-black'>
        <h4>Your Cart is currently empty!</h4>
      </div>
    );
  }
  return (
    <>
      <div className='m-2 p-2 sm:p-3 md:p-4 border-2 border rounded border-solid border-black'>
        {cartArr.map((e) => {
          return (
            <CartItem
              item={e.item}
              quantity={e.quantity}
              key={e.item.articleNumber}
              decQuantity={decreaseQuantity}
              incQuantity={increaseQuantity}
              deleteArticle={deleteHandler}
            ></CartItem>
          );
        })}
      </div>

      <CartSum passStripeUrl={passStripeUrlHandler} items={cartArr}></CartSum>
    </>
  );
};

export default CartBox;
