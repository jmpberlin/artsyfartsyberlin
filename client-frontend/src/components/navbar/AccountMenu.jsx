import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import spinner from './spinner.gif';

import { Link } from 'react-router-dom';

const AccountMenu = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get('/api/isUserLoggedIn').then((resFromDb) => {
      console.log(resFromDb);
      if (resFromDb.data.loggedIn) {
        setUser(resFromDb.data.user);
      } else {
        setUser(null);
      }
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
    <div className='borderbox flexwrapper '>
      <Link to='/'>
        <button
          onClick={logoutClickHandler}
          className='gradient text-xs hover:bg-purple-400 p-2 sm:p-3 md:p-4'
        >
          Log Out!
        </button>
      </Link>

      <Link to={`/users/${user._id}`}>
        <button className='gradient  text-xs p-2 sm:p-3 md:p-4'>
          Settings
        </button>
      </Link>
      {user.role === 'admin' && (
        <Link to={`/users/${user._id}/manageStore`}>
          <button className='gradient text-xs p-2 sm:p-3 md:p-4'>
            Manage Store
          </button>
        </Link>
      ) }
    </div>
  );
};

export default AccountMenu;
