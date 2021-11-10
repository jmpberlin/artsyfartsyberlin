import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import AccountMenu from './AccountMenu';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';

const MainNavbar = (props) => {
  const [userLogin, setUserlogin] = useState(false);
  const [userRegister, setUserRegister] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(props.currentUser);
  const [showAccount, setShowAccount] = useState(false);

  const loginClickHanlder = () => {
    if (loggedInUser) {
      setShowAccount(!showAccount);
      return;
    }

    setUserlogin(!userLogin);

    if (userRegister) {
      setUserRegister(false);
    }
  };
  const onRegisterHandler = () => {
    setUserRegister(true);
    setUserlogin(false);
  };
  const onLoginHandler = () => {
    setUserRegister(false);
    setUserlogin(true);
  };
  const onRegisterSuccessHandler = () => {
    setLoggedInUser(true);
    setUserlogin(false);
    setUserRegister(false);
  };
  const onLogoutHandler = () => {
    setLoggedInUser(undefined);
    setShowAccount(false);
  };
  const loginSuccessHandler = () => {
    setLoggedInUser(true);
    setUserlogin(false);
  };
  return (
    <>
      <div className='borderbox flexwrapper'>
        <div>
          <Link to='/'>
            <button className='gradient hover:bg-gray-400 p-2 sm:p-3 md:p-4 text-sm'>
              ARTSY
            </button>
          </Link>
        </div>
        <div className='gradient hover:bg-gray-400 p-2 sm:p-3 md:p-4'>
          <label className='hidden sm:inline md:inline' htmlFor='search'>
            search:
          </label>
          <input className='rounded-md w-24' id='search' type='search' />
        </div>
        <div>
          <button
            onClick={loginClickHanlder}
            className='gradient hover:bg-gray-400 p-2 sm:p-3 md:p-4'
          >
            {loggedInUser ? `Account` : 'log In'}
          </button>
        </div>
        <div>
          <Link to='/cart'>
            <button className='gradient hover:bg-gray-400 p-2 sm:p-3 md:p-4'>
              Cart
              <NotificationBadge
                count={props.itemCartCount}
                effect={Effect.SCALE}
              />
            </button>
          </Link>
        </div>
      </div>
      {userLogin && (
        <LoginBox
          onRegister={onRegisterHandler}
          onLoginSuccess={loginSuccessHandler}
        ></LoginBox>
      )}
      {userRegister && (
        <RegisterBox
          onLogin={onLoginHandler}
          onRegisterSuccess={onRegisterSuccessHandler}
        ></RegisterBox>
      )}
      {showAccount && <AccountMenu onLogout={onLogoutHandler}></AccountMenu>}
    </>
  );
};

export default MainNavbar;
