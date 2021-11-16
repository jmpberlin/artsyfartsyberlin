import React from 'react';
import { formatPrice } from '../../../../Utility/scripts/functions';

const DisplayPreviewPic = (props) => {
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
          <p className='m-2 text-lg'>Price: {formatPrice(props.price)}</p>
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
