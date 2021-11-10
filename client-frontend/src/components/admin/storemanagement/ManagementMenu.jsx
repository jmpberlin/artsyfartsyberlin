import React from 'react';

const ManagementMenu = (props) => {
  const selectTopicHandler = (num) => {
    props.onSelectTopic(num);
  };
  return (
    <div className='text-xs flex border rounded m-2 p-2 bg-red-50 flex-row'>
      <div>
        <button
          onClick={() => {
            selectTopicHandler(1);
          }}
          className='bg-white border rounded p-2 m-2'
        >
          All Items
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            selectTopicHandler(2);
          }}
          className='bg-white border rounded p-2 m-2'
        >
          Create New Item
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            selectTopicHandler(3);
          }}
          className='bg-white border rounded p-2 m-2'
        >
          Show Stocks
        </button>
      </div>
    </div>
  );
};

export default ManagementMenu;
