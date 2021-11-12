import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Spinner from '../../../UI/Spinner';
import ManageItemOverview from './ManageItemOverview';
import SafetyModal from '../../../UI/SafetyModal/SafetyModal';

const AllArticles = () => {
  const [itemsArr, setItemsArr] = useState(null);
  const [showSafetyModal, setShowSafetyModal] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  let modalMsg =
    'You are about to delete the above item from your online-shop. Are your sure, you want to proceed?';
  let modalAlert = 'Are you sure?';
  let yesButton = "Yes, I'm sure!";
  let noButton = 'No, go back!';
  useEffect(() => {
    axios.get('/items/admin/getAllItems').then((resFromDb) => {
      setItemsArr(resFromDb.data.items);
    });
  }, []);
  const deleteItemHandler = (item) => {
    setItemToDelete(item);
    setShowSafetyModal(true);
  };
  const hideSafetyModal = () => {
    setShowSafetyModal(false);
    setItemToDelete(null);
  };
  const onDeleteItem = (item) => {
    axios.delete(`/items/deleteItemFromStore/${item._id}`).then((resFromDb) => {
      console.log(resFromDb);
    });
  };
  if (itemsArr === null || itemsArr.length < 1) {
    return <Spinner></Spinner>;
  }
  return (
    <div className='border m-2 p-2 rounded'>
      {showSafetyModal && (
        <SafetyModal
          message={modalMsg}
          alert={modalAlert}
          yesButton={yesButton}
          noButton={noButton}
          hideOverlay={hideSafetyModal}
          item={itemToDelete}
          successHandler={onDeleteItem}
        ></SafetyModal>
      )}
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
