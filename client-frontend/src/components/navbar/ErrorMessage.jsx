import React from 'react';

const ErrorMessage = (props) => {
  return (
    <h4 className='text-red-600 border-2 rounded-md m-4 p-2'>{props.msg}</h4>
  );
};

export default ErrorMessage;
