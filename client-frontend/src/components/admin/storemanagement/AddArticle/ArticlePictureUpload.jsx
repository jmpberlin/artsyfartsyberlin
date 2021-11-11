import React, { useState } from 'react';
import spinner from '../../../../spinner.gif';
import axios from 'axios';

const ArticlePictureUpload = (props) => {
  // THIS IS URL TO DISPLAY THE PREVIEW
  const [previewUrl, setPreviewUrl] = useState(null);

  // SAVE PICTURE IN STATE
  const changePictureHandler = (e) => {
    console.log(
      'this is the onChange Handler function in the Upload component'
    );
    console.log(e.target.files);
    props.onChoosePicture(e.target.files);
    // setProfilePic(e.target.files[0]);
    // if (e.target.files.length > 0) {
    //   setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    // }
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

      {previewUrl && (
        <div className='m-1 border rounded w-1/2 '>
          <img src={previewUrl} alt='preview of the upload' />
        </div>
      )}
    </div>
  );
};

export default ArticlePictureUpload;
