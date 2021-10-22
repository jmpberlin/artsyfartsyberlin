import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import SingleItem from './SingleItem';

const ItemBox = (props) => {
  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    axios.get('/items/allItems').then((resFromDb) => {
      setAllItems(resFromDb.data);
    });
  }, []);

  if (allItems.length === 0) {
    return (
      <div className='borderbox flexwrapper flex-col'>
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
    <div className='borderbox flexwrapper flex-col'>
      <h2>Hallo from Itembox</h2>
      {allItems.map((item) => {
        return <SingleItem itemObj={item}></SingleItem>;
      })}
    </div>
  );
};

export default ItemBox;
