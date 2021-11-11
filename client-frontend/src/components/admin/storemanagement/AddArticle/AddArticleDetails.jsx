import React from 'react';

const AddArticleDetails = (props) => {
  const inputHandler = (e) => {
    props.inputHandler(e.target);
  };
  return (
    <div className='text-xs'>
      <div className='p-2 mb-1'>
        <label htmlFor='articleName'>Article Name:</label>
        <input
          onChange={inputHandler}
          className='border border-black rounded rounded w-2/3 '
          type='text'
          name='name'
          id='articleName'
        />
      </div>
      <div className='p-2 mb-1'>
        <label htmlFor='description'>Desciption:</label>
        <input
          onChange={inputHandler}
          className='border border-black rounded rounded w-2/3 '
          type='text'
          name='description'
          id='description'
        />
      </div>
      <div className='p-2 mb-1'>
        <label htmlFor='description'>Price:</label>
        <input
          onChange={inputHandler}
          className='border border-black rounded rounded w-2/3 '
          type='number'
          name='price'
          id='price'
          placeholder='give price in cents - check preview '
        />
      </div>
      <div className='p-2 mb-1'>
        <label htmlFor='description'>Width:</label>
        <input
          onChange={inputHandler}
          className='border border-black rounded rounded w-2/3 '
          type='number'
          name='width'
          id='width'
          placeholder='width in cm'
        />
      </div>
      <div className='p-2 mb-1'>
        <label htmlFor='description'>Height:</label>
        <input
          onChange={inputHandler}
          className='border border-black rounded rounded w-2/3 '
          type='number'
          name='height'
          id='height'
          placeholder='height in cm'
        />
      </div>
    </div>
  );
};

export default AddArticleDetails;
