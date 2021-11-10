import React from 'react';
import classes from './UserErrorModal.module.css';
import { Link } from 'react-router-dom';

const ErrorModal = (props) => {
  const onHideHandler = () => {
    props.hideOverlay();
  };
  return (
    <div>
      <div className={classes.backdrop}>
        <div className={classes.modal}>
          <p className='m-4 border border-black rounded p-3'>{props.message}</p>
          <footer className={classes.actions}>
            <Link to='/'>
              <button
                className='border border-black rounded p-2 gradient hover:bg-gray-400 '
                onClick={onHideHandler}
              >
                {props.button}
              </button>
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
