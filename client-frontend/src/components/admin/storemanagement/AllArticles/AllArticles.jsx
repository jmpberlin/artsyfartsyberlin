import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Spinner from '../../../UI/Spinner';
import ManageItemOverview from './ManageItemOverview';

const AllArticles = () => {
  const [itemsArr, setItemsArr] = useState(null);
  const [showSafetyModal, setShowSafetyModal] = useState(null);
  useEffect(() => {
    axios.get('/items/admin/getAllItems').then((resFromDb) => {
      setItemsArr(resFromDb.data.items);
    });
  }, []);
  const deleteItemHandler = (item) => {
    setShowSafetyModal(true);
  };
  const hideSafetyModal = () => {};
  const onDeleteItem = () => {};
  if (itemsArr === null || itemsArr.length < 1) {
    return <Spinner></Spinner>;
  }
  return (
    <div className='border m-2 p-2 rounded'>
      {itemsArr.map((item) => {
        return (
          <ManageItemOverview
            deleteItem={deleteItemHandler}
            key={item._id}
            item={item}
          ></ManageItemOverview>
        );
      })}
    </div>
  );
};

export default AllArticles;
