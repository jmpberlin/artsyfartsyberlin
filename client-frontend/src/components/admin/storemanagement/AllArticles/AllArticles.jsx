import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Spinner from '../../../UI/Spinner';
import ManageItemOverview from './ManageItemOverview';
import SafetyModal from '../../../UI/SafetyModal/SafetyModal';

const AllArticles = () => {
  const [itemsArr, setItemsArr] = useState(null);
  const [showSafetyModal, setShowSafetyModal] = useState(null);
  const [itemToHandle, setItemToHandle] = useState(null);
  const [deleteRestore, setDeleteRestore] = useState('');
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  let modalAlert = 'Are you sure?';
  let yesButton = "Yes, I'm sure!";
  let noButton = 'No, go back!';
  useEffect(() => {
    axios.get('/api/items/admin/getAllItems').then((resFromDb) => {
      setItemsArr(resFromDb.data.items);
    });
  }, [reloadTrigger]);
  const deleteItemHandler = (item) => {
    setItemToHandle(item);
    setDeleteRestore('delete');
    setModalMsg(
      'You are about to delete the above item from your online-shop. Are your sure, you want to proceed?'
    );
    setShowSafetyModal(true);
  };
  const restoreItemHandler = (item) => {
    setItemToHandle(item);
    setDeleteRestore('restore');
    setModalMsg(
      'You are about to restore the above item from your online-shop. Are your sure, you want to proceed?'
    );
    setShowSafetyModal(true);
  };
  const hideSafetyModal = () => {
    setShowSafetyModal(false);

    setItemToHandle(null);
  };
  const onDeleteItem = (item) => {
    axios
      .delete(`/api/items/deleteItemFromStore/${item._id}`)
      .then((resFromDb) => {
        console.log(resFromDb);
        setReloadTrigger(!reloadTrigger);
      });
  };
  const onRestoreItem = (item) => {
    axios.post(`/api/items/restoreItem/${item._id}`).then((resFromDb) => {
      setReloadTrigger(!reloadTrigger);
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
          item={itemToHandle}
          deleteHandler={onDeleteItem}
          restoreHandler={onRestoreItem}
          handler={deleteRestore}
        ></SafetyModal>
      )}
      {itemsArr.map((item) => {
        return (
          <ManageItemOverview
            deleteItem={deleteItemHandler}
            restoreItem={restoreItemHandler}
            key={item._id}
            item={item}
          ></ManageItemOverview>
        );
      })}
    </div>
  );
};

export default AllArticles;
