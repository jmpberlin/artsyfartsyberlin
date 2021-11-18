import React from 'react';
import cross_red from '../UI/cross_red.png';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className='m-2 p-4 border border-black rounded flex flex-col text-center mt-6'>
      <div className='mb-5'>
        <h4 className='font-bold'>Payment Canceled!</h4>
      </div>
      <div>
        <p>
          Your Payment was canceled. Please go back to your cart and try again!
        </p>
      </div>
      <div className='w-1/2 m-auto mt-10'>
        <img src={cross_red} alt='successfulll green check' />
      </div>
      <div className='mt-4'>
        <p>You can close this page now.</p>
      </div>
      <div className='mt-4'>
        <Link to='/'>
          <button className='bg-red-100 border rounded p-2 border-black'>
            Close window
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
