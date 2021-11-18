import React, { useState } from 'react';
import axios from 'axios';
import ArticlePictureUpload from './ArticlePictureUpload';
import AddArticleDetails from './AddArticleDetails';
import PreviewButton from './PreviewButton';
import PreviewModal from './PreviewModal/PreviewModal';
import SaveButton from './SaveButton';

const AddArticle = (props) => {
  // THIS IS WHERE THE FILE IS STORED, THAT GET PUSHED TO CLOUDINARY
  const [profilePic, setProfilePic] = useState(null);
  // THIS IS URL TO DISPLAY THE PREVIEW
  const [previewUrl, setPreviewUrl] = useState(null);

  // SHOW AND HIDE PREVIEW
  const [showPreview, setShowPreview] = useState(false);

  // STORE INPUT VALUES IN THE REFERING STATE:
  const [articleName, setArticleName] = useState(null);
  const [articleDescription, setArticleDescription] = useState(null);
  const [articlePrice, setArticlePrice] = useState(null);
  const [articleWidth, setArticleWidth] = useState(null);
  const [articleHeight, setArticleHeight] = useState(null);

  const saveItemHandler = () => {
    // PUT PICTURE DATA IN RIGHT FORMAT
    const uploadData = new FormData();
    uploadData.append('imageUrl', profilePic);

    axios.post(`/api/items/newItem/picUpload`, uploadData).then((resp) => {
      if (resp.data.success) {
        axios
          .post(
            '/api/items/newItem/dataUpload',
            {
              imgUrl: resp.data.picUrl,
              name: articleName,
              description: articleDescription,
              price: articlePrice,
              width: articleWidth,
              height: articleHeight,
            },
            { new: true }
          )
          .then((resFromDb) => {});
      }
    });
  };
  // SAVE PICTURE IN STATE
  const changePictureHandler = (pic) => {
    console.log(
      'this is the Add article Parent Component, where the Data from the upload Component schould end up:'
    );
    console.log(pic[0]);
    setProfilePic(pic[0]);
    if (pic.length > 0) {
      setPreviewUrl(URL.createObjectURL(pic[0]));
      console.log(previewUrl);
    }
  };
  const changeInputHandler = (input) => {
    const val = input.value;
    const name = input.name;

    switch (name) {
      case 'name':
        setArticleName(val);
        break;
      case 'description':
        setArticleDescription(val);
        break;
      case 'price':
        setArticlePrice(val);
        break;
      case 'width':
        setArticleWidth(val);
        break;
      case 'height':
        setArticleHeight(val);
        break;
      default:
        break;
    }
  };

  const togglePreviewHandler = () => {
    setShowPreview(!showPreview);
  };
  return (
    <>
      <div className='text-sm bg-gray-50 border rounded mb-4 m-2 flex-col'>
        <ArticlePictureUpload
          onChoosePicture={changePictureHandler}
        ></ArticlePictureUpload>
        <AddArticleDetails
          inputHandler={changeInputHandler}
          user={props.user}
        ></AddArticleDetails>
        <div className='flex justify-around'>
          <PreviewButton togglePreview={togglePreviewHandler}></PreviewButton>
          <SaveButton saveItem={saveItemHandler}></SaveButton>
        </div>
      </div>
      {showPreview && (
        <PreviewModal
          hideOverlay={togglePreviewHandler}
          key={previewUrl}
          pic={previewUrl}
          name={articleName}
          price={articlePrice}
          description={articleDescription}
          width={articleWidth}
          height={articleHeight}
        ></PreviewModal>
      )}
    </>
  );
};

export default AddArticle;
