import React from 'react';
import Spinner from '../../../UI/Spinner';
import { formatPrice } from '../../../../Utility/scripts/functions';

const ManageSingleItem = (props) => {
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  let year = new Date(props.item.timestamp).toLocaleString('de-DE', options);

  const onDeleteHandler = (e) => {
    props.deleteItem(props.item);
  };
  const onRestoreHandler = (e) => {
    props.restoreItem(props.item);
  };
  if (props.item === null || props.item === undefined) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <div
        className={`flex flex-row justify-between items-center m-2 p-2 text-xs ${
          props.item.archived ? 'bg-red-100' : ''
        }`}
      >
        <div className='w-3/12 border border-black p-2'>
          <img src={props.item.imgUrl} alt='' />
        </div>
        <div className='w-3/12'>
          <p className='mb-2 mt-2 font-bold text-sm'>{props.item.name}</p>
          {props.item.archived && (
            <p className='border border-black rounded-xl bg-gray-100 p-1'>
              archived article
            </p>
          )}

          <p className='mb-2 mt-2'>
            Added on: <br />
            {year}
          </p>
          <p>{formatPrice(props.item.price)}</p>
        </div>
        <div></div>

        {/* DEPENDING ON THE ARCHIVED STATUS OF THE ARTICLE THERE ARE TWO DIFFENRENT DIVS RENDERED!  */}
        {props.item.archived ? (
          <div className='flex flex-col items-center'>
            <div className='mb-3'>
              <p>Restore?</p>
            </div>
            <div className='bg-green-200 flex justify-around items-center border border-black rounded-full w-7 h-7'>
              <button onClick={onRestoreHandler}>
                <span>&#10003;</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className='mb-3'>
              <p>Delete?</p>
            </div>
            <div className='bg-red-600 flex justify-around items-center border border-black rounded-full w-7 h-7'>
              <button onClick={onDeleteHandler}>X</button>
            </div>
          </div>
        )}

        {/* ___________ */}
      </div>
    </div>
  );
};

export default ManageSingleItem;
