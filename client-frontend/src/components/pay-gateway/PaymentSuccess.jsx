import React from 'react';
import checkmark_green from '../UI/checkmark_green.png';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className='m-2 p-4 border border-black rounded flex flex-col text-center mt-6'>
      <div className='mb-5'>
        <h4 className='font-bold'>Payment Successfull!</h4>
      </div>
      <div>
        <p>
          Your Payment was successfull and your Order is being processed right
          now..
        </p>
      </div>
      <div className='w-1/2 m-auto mt-10'>
        <img src={checkmark_green} alt='successfulll green check' />
      </div>
      <div className='mt-4'>
        <p>You can close this page now.</p>
      </div>
      <div className='mt-4'>
        <Link to='/'>
          <button className='bg-green-100 border rounded p-2 border-black'>
            Close window
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
