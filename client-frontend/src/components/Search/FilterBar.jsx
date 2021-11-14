import React from 'react';

const FilterBar = (props) => {
  const onCloseHandler = () => {
    props.closeFilterBar();
  };
  return (
    <div>
      <div></div>
      <h2>Hey there from filterbar!</h2>
      <div>
        <button
          className='border rounded p-2 m-2 bg-gray-50'
          onClick={onCloseHandler}
        >
          hide filter
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
