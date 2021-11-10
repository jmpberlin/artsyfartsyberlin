import React, { useState } from 'react';
import spinner from '../../../spinner.gif';
import axios from 'axios';

const AddArticle = (props) => {
  console.log(props.user);
  // THIS IS WHERE THE FILE IS STORED, THAT GET PUSHED TO CLOUDINARY
  const [profilePic, setProfilePic] = useState(null);
  // THIS IS URL TO DISPLAY THE PREVIEW
  const [previewUrl, setPreviewUrl] = useState(null);
  const submitPicHandler = (e) => {
    e.preventDefault();
    // PUT PICTURE DATA IN RIGHT FORMAT
    const uploadData = new FormData();
    uploadData.append('imageUrl', profilePic);
    axios
      .post(`/users/${props.user._id}/picUpload`, uploadData)
      .then((resp) => {
        if (resp.data.success) {
          props.refreshParentComponent();
        }
      });
    e.preventDefault();
  };
  // SAVE PICTURE IN STATE
  const changePictureHandler = (e) => {
    setProfilePic(e.target.files[0]);
    if (e.target.files.length > 0) {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div className='text-sm bg-gray-50 border rounded mb-4 m-2'>
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
    </div>
  );
};

export default AddArticle;
