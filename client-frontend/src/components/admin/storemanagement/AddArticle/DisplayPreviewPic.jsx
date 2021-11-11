import React from 'react';

const DisplayPreviewPic = (props) => {
  const priceParser = (cents) => {
    let decimal = (cents / 100).toString();

    let splitArr = decimal.split('.');

    if (splitArr.length === 1) {
      return splitArr[0] + ',' + '00' + ' €';
    }
    if (splitArr.length > 1) {
      return splitArr[0] + ',' + splitArr[1] + ' €';
    }
  };
  return (
    <div>
      <div className='m-3 flex  flex-col'>
        <div className='flex justify-center'>
          <img className='p-3 w-8/12' src={props.pic} alt='' />
        </div>
        <div className='p-3 text-xs text-center items-center'>
          <p className='text-2xl m-4'>{props.name}</p>
          <p className='m-2'>{props.description}</p>
          <p className='m-2'>Width: {props.width} cm</p>
          <p className='m-2'>Height: {props.height} cm</p>
          <p className='m-2 text-lg'>Price: {priceParser(props.price)}</p>
          <button className='border border-black p-2 gradient rounded '>
            Add to Cart
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default DisplayPreviewPic;
