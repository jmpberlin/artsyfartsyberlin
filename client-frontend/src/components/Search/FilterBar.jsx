import React from 'react';

const FilterBar = (props) => {
  const onCloseHandler = () => {
    props.closeFilterBar();
  };
  return (
    <div>
      <div className='flex text-xs'>
        <div className='border rounded p-2 m-2 w-1/4'>option 1</div>
        <div className='border rounded p-2 m-2 w-1/4'>option 2</div>
        <div className='border rounded p-2 m-2 w-1/4'>option 3</div>
        <div className='border rounded p-2 m-2 w-1/4'>option 4</div>
      </div>
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
