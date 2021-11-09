import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import spinner from './spinner.gif';

import { Link } from 'react-router-dom';

const AccountMenu = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get('/checkuser').then((resFromDb) => {
      setUser(resFromDb.data.currentUser);
    });
  }, []);

  const logoutClickHandler = () => {
    axios.get('/auth/logout').then((resFromDb) => {
      props.onLogout();
    });
  };
  if (user === null) {
    return (
      <div className='borderbox flexwrapper flex-col'>
        <img src={spinner} alt='' />
      </div>
    );
  }
  return (
    <div className='borderbox flexwrapper'>
      <button
        onClick={logoutClickHandler}
        className='gradient hover:bg-purple-400 p-2 sm:p-3 md:p-4'
      >
        Log Out!
      </button>
     
      <Link to={`/users/${user._id}`}>
        <button className='gradient p-2 sm:p-3 md:p-4'>Settings</button>
      </Link>
    </div>
  );
};

export default AccountMenu;
