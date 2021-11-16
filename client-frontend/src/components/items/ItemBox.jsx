import React from 'react';
import { useState } from 'react';
import SingleItem from './SingleItem';

const ItemBox = (props) => {
  const [allItems, setAllItems] = useState(props.articles);
  // useEffect(() => {
  //   axios.get('/items/allItems').then((resFromDb) => {
  //     setAllItems(resFromDb.data);
  //   });
  // }, []);
  const addToCartHandler = (itemToAdd) => {
    props.addToCart(itemToAdd);
  };
  if (allItems.length === 0) {
    return (
      <div className='borderbox flexwrapper flex-col'>
        {props.show && <h1> ... no articles found! </h1>}
        <div className='lds-roller asd  p-4 m-4'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return (
    <div className='m-4 flexwrapper flex-col'>
      {allItems.map((item) => {
        return (
          <SingleItem
            addToCard={addToCartHandler}
            key={item._id}
            itemObj={item}
          ></SingleItem>
        );
      })}
    </div>
  );
};

export default ItemBox;
