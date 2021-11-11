import React from 'react';

const SaveButton = (props) => {
  const clickHandler = () => {
    props.saveItem();
  };
  return (
    <>
      <button
        className='border border-black p-2 gradient rounded'
        onClick={clickHandler}
      >
        Save Item
      </button>
    </>
  );
};

export default SaveButton;
