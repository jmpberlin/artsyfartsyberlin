import React from 'react';
import classes from './PreviewModal.module.css';
import DisplayPreviewPic from '../DisplayPreviewPic';

const ErrorModal = (props) => {
  const onHideHandler = () => {
    props.hideOverlay();
  };
  return (
    <div>
      <div className={classes.backdrop} onClick={onHideHandler}>
        <div className={classes.modal}>
          <DisplayPreviewPic
            pic={props.pic}
            name={props.name}
            price={props.price}
            description={props.description}
            width={props.width}
            height={props.height}
          ></DisplayPreviewPic>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
