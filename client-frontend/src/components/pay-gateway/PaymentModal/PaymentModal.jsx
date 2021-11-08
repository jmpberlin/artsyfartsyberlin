import React from 'react';
import classes from './PaymentModal.module.css';

const ErrorModal = (props) => {
  console.log(props.url);
  const onHideHandler = () => {
    props.hideOverlay();
  };
  return (
    <div>
      <div className={classes.backdrop}>
        <div className={classes.modal}>
          {/* INCORRECT CASING ERROR ____ CHECK LATER!  */}
          <iframe title='paymentModal' src={props.url}></iframe>
          {/* <iframe src='http://www.google.de'></iframe> */}
          <footer className={classes.actions}>
            <button onClick={onHideHandler}>
              Yo, das hab ich schon verstanden.
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
