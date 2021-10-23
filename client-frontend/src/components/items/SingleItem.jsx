import React, { useState } from 'react';

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
  return (
    <div className='borderbox flexwrapper flex w-full justify-evenly m-auto'>
      <div className='gradient hover:bg-green-400 p-2 sm:p-3 md:p-4'>
        {props.itemObj.name}
      </div>
      {/* <div className='p-3 m-2'>
        {props.itemObj.description.split(' ').slice(0, 5).join(' ') + '...'}
      </div>
       */}
      <div className='flex row'>
        <button
          onClick={decreaseHandler}
          className='rounded-full p-2 border-2 hover:bg-green-400'
        >
          -
        </button>

        <div className='inline-block p-2 m-2 '>{quantity}</div>

        <button
          onClick={increaseHandler}
          className='rounded-full p-2 border-2 hover:bg-green-400'
        >
          +
        </button>
      </div>
      <div>
        <button
          onClick={onAddHandler}
          className='gradient hover:bg-green-400 p-2 sm:p-3 md:p-4'
        >
          add
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
