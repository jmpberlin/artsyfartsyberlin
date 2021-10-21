import axios from 'axios';
import React from 'react';

const AccountMenu = (props) => {
  const logoutClickHandler = () => {
    axios.get('/auth/logout').then((resFromDb) => {
      console.log(resFromDb);
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
    </div>
  );
};

export default AccountMenu;
