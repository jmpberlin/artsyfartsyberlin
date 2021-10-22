import React from 'react';

const SingleItem = (props) => {
  return (
    <div className='borderbox flexwrapper flex flex-row'>
      <div className='gradient hover:bg-purple-400 p-2 sm:p-3 md:p-4'>
        {props.itemObj.name}
      </div>
      <div className='p-3 m-2'>
        {props.itemObj.description.split(' ').slice(0, 5).join(' ') + '...'}
      </div>
      <div>
        <button className='gradient hover:bg-purple-400 p-2 sm:p-3 md:p-4'>
          add
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
