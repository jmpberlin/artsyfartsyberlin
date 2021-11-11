import React from 'react';

const PreviewButton = (props) => {
  const clickHandler = () => {
    props.togglePreview();
  };
  return (
    <>
      <button
        className='border border-black p-2 gradient rounded'
        onClick={clickHandler}
      >
        Preview
      </button>
    </>
  );
};

export default PreviewButton;
