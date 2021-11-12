import React from 'react';
import classes from './SafetyModal.module.css';
import { formatPrice } from '../../../Utility/scripts/functions';

const SafetyModal = (props) => {
  const proceedHandler = () => {
    props.hideOverlay();
    props.successHandler(props.item);
  };
  const goBackHandler = () => {
    props.hideOverlay();
  };

  return (
    <div>
      <div className={`${classes.backdrop}`}>
        <div className={`${classes.modal} text-xs p-5`}>
          <div className='font-bold mt-2 mb-4 flex justify-around'>
            <p>{props.alert}</p>
          </div>
          {props.item && (
            <div className='flex flex-row text-xs mb-4 border border-black rounded p-2 justify-around items-center'>
              <div className='w-1/3'>
                <img src={props.item.imgUrl} alt='item preview' />
              </div>
              <div className='w-1/3'>
                <p>{props.item.name}</p>
              </div>
              <div>
                <p>{formatPrice(props.item.price)}</p>
              </div>
            </div>
          )}
          <div>
            <p>{props.message}</p>
          </div>
          <div className='flex flex-row justify-evenly mt-4'>
            <button
              className='border rounded bg-gray-100 p-2 m-2'
              onClick={proceedHandler}
            >
              {props.yesButton}
            </button>

            <button
              className='border rounded bg-gray-100 p-2 m-2'
              onClick={goBackHandler}
            >
              {props.noButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyModal;
