import React from 'react';

const ArticlePictureUpload = (props) => {
  // SAVE PICTURE IN STATE
  const changePictureHandler = (e) => {
    props.onChoosePicture(e.target.files);
  };
  return (
    <div className='flex p-2 mb-2 '>
      <label htmlFor='profilePhoto' className='w-1/2'>
        Upload Profile Pic:
      </label>
      <input
        onChange={changePictureHandler}
        type='file'
        name='profilePhoto'
        id='profilePhoto'
      />
    </div>
  );
};

export default ArticlePictureUpload;
