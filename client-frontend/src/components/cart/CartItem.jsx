import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router-dom';
import { formatPrice } from '../../Utility/scripts/functions';

const CartItem = (props) => {
  useEffect(() => {}, []);

  const increaseHandler = (quantityToInc) => {
    props.incQuantity(quantityToInc);
  };
  const decreaseHandler = (quantityToDec) => {
    props.decQuantity(quantityToDec);
  };
  const deleteHandler = (articleId) => {
    props.deleteArticle(articleId);
  };
  return (
    <div className='flex justify-evenly flexwrapper flex-row mb-6 items-center'>
      <div className='hover:bg-gray-400 p-2 sm:p-3 md:p-4 border-2 rounded-md'>
        {/* <p className='text-xs'> {props.item.name}</p> */}
        <Link to={`/item/${props.item._id}`}>
          <img src={props.item.imgUrl} alt='' />
        </Link>
      </div>

      <div className='hover:bg-gray-400 p-2 sm:p-3 md:p-4'>
        <p className='text-xs'> {formatPrice(props.item.price)} </p>
      </div>

      <div className='flex row w-20'>
        <button
          onClick={() => {
            decreaseHandler({
              quantity: props.quantity - 1,
              item: props.item._id,
            });
          }}
          className='rounded-full p-1 border border-black hover:bg-gray-400'
        >
          <p className='text-xs'>-</p>
        </button>

        <div className='inline-block p-1 m-1 '>
          <p className='text-xs'>{props.quantity}</p>
        </div>

        <button
          onClick={() => {
            increaseHandler({
              quantity: props.quantity + 1,
              item: props.item._id,
            });
          }}
          className='rounded-full p-1 border border-black hover:bg-gray-400'
        >
          <p className='text-xs'>+</p>
        </button>
      </div>

      <div className='hover:bg-gray-400 p-2 sm:p-3 md:p-4'>
        <p className='text-xs'>
          {formatPrice(props.item.price * props.quantity)}
        </p>
      </div>
      <div
        onClick={() => {
          deleteHandler(props.item._id);
        }}
        className='hover:bg-gray-400 rounded-md'
      >
        <IconButton aria-label='delete' size='large'>
          <DeleteIcon />
        </IconButton>
        {/* <p className='text-xs'>X</p> */}
      </div>
    </div>
  );
};

export default CartItem;
