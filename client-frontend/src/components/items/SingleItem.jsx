import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SingleItem = (props) => {
  const [quantity, setQuantity] = useState(0);
  const decreaseHandler = () => {
    if (quantity - 1 >= 0) {
      setQuantity((prevState) => {
        return prevState - 1;
      });
    }
  };
  const increaseHandler = () => {
    if (quantity + 1 <= 10) {
      setQuantity((prevState) => {
        return prevState + 1;
      });
    }
  };
  const onAddHandler = () => {
    if (quantity > 0) {
      props.addToCard({ item: props.itemObj, quantity: quantity });
      setQuantity(0);
    }
  };
  const priceCalculator = (cents) => {
    if (cents % 10 === 0) {
      return cents / 100 + '.' + '00' + ' €';
    } else {
      return cents / 100 + ' €';
    }
  };
  return (
    <div className='border-2 flex mb-6 hover:bg-gray-50'>
      <div className='flex row'>
        <div className='w-2/3'>
          <Link to={`/item/${props.itemObj._id}`}>
            <img
              className='object-contain '
              src={props.itemObj.imgUrl}
              alt=''
            />
          </Link>
        </div>
        <div className='w-1/2 p-2 text-sm'>
          <p>{props.itemObj.description}</p>
        </div>
      </div>

      <div className='flexwrapper flex-col w-full justify-evenly m-auto p-2'>
        <div className='gradient hover:bg-gray-400 p-2 sm:p-3 md:p-4 flex-col text-sm'>
          <div>{props.itemObj.name}</div>
          <div>{priceCalculator(props.itemObj.price)}</div>
        </div>
        {/* <div className='p-3 m-2'>
        {props.itemObj.description.split(' ').slice(0, 5).join(' ') + '...'}
      </div>
       */}
        <div className='flex row'>
          <button
            onClick={decreaseHandler}
            className='rounded-full p-2 border-2 hover:bg-gray-400'
          >
            -
          </button>

          <div className='inline-block p-2 m-2 '>{quantity}</div>

          <button
            onClick={increaseHandler}
            className='rounded-full p-2 border-2 hover:bg-gray-400'
          >
            +
          </button>
        </div>
        <div>
          <button
            onClick={onAddHandler}
            className='gradient hover:bg-gray-400 p-2 sm:p-3 md:p-4'
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
