import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const AccountMenu = (props) => {
  const logoutClickHandler = () => {
    axios.get('/auth/logout').then((resFromDb) => {
      props.onLogout();
    });
  };
  return (
    <div className='borderbox flexwrapper'>
      <button
        onClick={logoutClickHandler}
        className='gradient hover:bg-purple-400 p-2 sm:p-3 md:p-4'
      >
        Log Out!
      </button>
      <Link to='/'>
        <button className='gradient p-2 sm:p-3 md:p-4'>Settings</button>
      </Link>
    </div>
  );
};

export default AccountMenu;
