import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditName from '../EditName';

const UserDetails = (props) => {
  // THIS IS WHERE THE FILE IS STORED, THAT GET PUSHED TO CLOUDINARY
  const [profilePic, setProfilePic] = useState(null);
  // THIS IS URL TO DISPLAY THE PREVIEW
  const [previewUrl, setPreviewUrl] = useState(null);

  // CHANGE YOUR NAME FORM :
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);

  // CHANGE YOUR SHIPPING ADDRESS FORM:
  const [addressName, setAddressName] = useState(
    props.user.address.addressName
  );
  const [streetName, setStreetName] = useState(props.user.address.streetName);
  const [streetNumber, setStreetNumber] = useState(
    props.user.address.streetNumber
  );
  const [postalCode, setPostalCode] = useState(props.user.address.postalCode);
  const [country, setCountry] = useState(props.user.address.country);
  const [city, setCity] = useState(props.user.address.city);

  const addressInputHandler = (e) => {
    const name = e.target.name;

    switch (name) {
      case 'addressName':
        setAddressName(e.target.value);
        break;
      case 'streetName':
        setStreetName(e.target.value);
        break;
      case 'streetNumber':
        setStreetNumber(e.target.value);
        break;
      case 'postalCode':
        setPostalCode(e.target.value);
        break;
      case 'country':
        setCountry(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;
      default:
        break;
    }
  };

  /// NO FRONTEND CHECK YET; IF DATA IS VALID YET!
  const submitAddressHandler = (e) => {
    e.preventDefault();
    axios
      .post(`/users/${props.user._id}/addressUpdate`, {
        addressName,
        streetName,
        streetNumber,
        postalCode,
        country,
        city,
      })
      .then((resFromDb) => {
        props.refreshParentComponent();
      });
  };

  // SHOW DIFFERENTFORMS:
  const [showNameForm, setShowNameForm] = useState(false);
  const displayNameEdit = () => {
    setShowNameForm(!showNameForm);
  };

  // SHOW

  // SAVE PICTURE IN STATE
  const changePictureHandler = (e) => {
    setProfilePic(e.target.files[0]);
    if (e.target.files.length > 0) {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  // SAVE FIRST NAME IN STATE
  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };
  // SAVE LAST NAME IN STATE
  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value);
  };

  // SUBMIT FIRST; LASTNAME TOBACKEND
  const submitNameHandler = (e) => {
    e.preventDefault();

    axios
      .post(`/users/${props.user._id}/nameUpdate`, {
        firstName: firstName,
        lastName: lastName,
      })
      .then((resFromDb) => {
        props.refreshParentComponent();
      });
  };
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

  if (props.user === undefined || props.user === null) {
    return <h1>User not yet defined</h1>;
  }
  return (
    <div className='m-3'>
      <div className='mb-1 p-2 flex border rounded bg-gray-50 mb-4 '>
        {props.user.profileUrl ? (
          <div>
            <img
              className='rounded-full w-20 h-20'
              src={props.user.profileUrl}
              alt='profile'
            />
          </div>
        ) : (
          <div className='w-20 h-20 border border-black rounded-full flex items-center justify-center bg-gray-300 '>
            {props.user.email[0].toUpperCase()}
            {props.user.email.split('.')[1][0].toUpperCase()}
          </div>
        )}
        {props.user.firstName ? (
          <p className=' p-2'>
            Hey there, {props.user.firstName}{' '}
            <span onClick={displayNameEdit} className='text-xs border-black '>
              [edit]
            </span>
          </p>
        ) : (
          <p className=' p-2 text-sm'>Hey there, {props.user.email}</p>
        )}
      </div>
      <div className='text-xs bg-gray-50 border rounded mb-4'>
        <form
          action={`/users/:${props.user._id}/account`}
          method='post'
          encType='multipart/form-data'
        >
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
            {/* <input hidden type='file' name='existingImage' id='' /> */}
            {previewUrl && (
              <div className='m-1 border rounded w-1/2 '>
                <img src={previewUrl} alt='preview of the upload' />
              </div>
            )}
          </div>
          <div className='flex justify-center'>
            <button
              onClick={submitPicHandler}
              className='m-2 border border-black rounded p-1 gradient'
              type='submit'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      {showNameForm && <EditName></EditName>}
      <div className='text-xs bg-gray-50 border rounded mb-4'>
        <div className='p-2 mb-1'>
          <label className='' htmlFor='firstName'>
            First Name:
          </label>
          <input
            onChange={firstNameChangeHandler}
            className='border border-black rounded w-2/3 '
            type='text'
            name='firstName'
            id='firstName'
            placeholder={props.user.firstName}
          />
        </div>
        <div className='p-2 mb-1'>
          <label htmlFor='lastName'>Last Name: </label>
          <input
            onChange={lastNameChangeHandler}
            className='border border-black rounded rounded w-2/3'
            type='text'
            name='lastName'
            id='lastName'
            placeholder={props.user.lastName}
          />
        </div>
        <div className='flex justify-center'>
          <button
            onClick={submitNameHandler}
            className='m-2 border border-black rounded p-1 gradient'
            type='submit'
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* _______________________________ADDRESS FIELD */}

      <div className='text-xs bg-gray-50 border rounded mb-2'>
        <div className='p-2 mb-1'>
          <h4>Update your Shipping Address:</h4>
        </div>
        <div className='p-2 mb-1'>
          <label htmlFor='addressName'>Address name:</label>
          <input
            onChange={addressInputHandler}
            className='border border-black rounded rounded w-2/3 '
            type='text'
            name='addressName'
            id='addressName'
            placeholder={props.user.address.addressName}
            // value={props.user.address.addressName}
          />
        </div>
        <div className='p-2 mb-1'>
          <label htmlFor='streetName'>Street name:</label>

          <input
            onChange={addressInputHandler}
            className='border border-black rounded rounded w-2/3  '
            type='text'
            name='streetName'
            id='streetName'
            placeholder={props.user.address.streetName}
            // value={props.user.address.streetName}
          />
        </div>
        <div className='p-2 mb-1'>
          <label htmlFor='streetNumber'>Street number:</label>

          <input
            onChange={addressInputHandler}
            className='border border-black rounded  w-2/3'
            type='number'
            name='streetNumber'
            id='streetNumber'
            placeholder={props.user.address.streetNumber}
          />
        </div>
        <div className='p-2 mb-1'>
          <label htmlFor='postalCode'>Postal code:</label>
          <input
            onChange={addressInputHandler}
            className='border border-black rounded w-2/3 '
            type='text'
            name='postalCode'
            id='postalCode'
            placeholder={props.user.address.postalCode}
            // value={props.user.address.postalCode}
          />
        </div>
        <div className='p-2 mb-1'>
          <label htmlFor='city'>City:</label>

          <input
            onChange={addressInputHandler}
            className='border border-black rounded w-2/3'
            type='text'
            name='city'
            id='city'
            placeholder={props.user.address.city}
            // value={props.user.address.city}
          />
        </div>
        <div className='p-2 mb-1'>
          <label htmlFor='country'>Country:</label>

          <input
            onChange={addressInputHandler}
            className='border border-black rounded w-2/3'
            type='text'
            name='country'
            id='country'
            placeholder={props.user.address.country}
            // value={props.user.address.country}
          />
        </div>
        <div className='flex justify-center'>
          <button
            onClick={submitAddressHandler}
            className='m-2 border border-black rounded p-1 gradient'
            type='submit'
          >
            Save Changes
          </button>
        </div>
        <div className='flex justify-center'>
          <Link to='/'>
            <button className='m-2 border border-black rounded p-1 gradient'>
              Back to Start!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
