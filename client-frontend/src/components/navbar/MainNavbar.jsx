import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import AccountMenu from './AccountMenu';

const MainNavbar = (props) => {
  const [userLogin, setUserlogin] = useState(false);
  const [userRegister, setUserRegister] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(props.currentUser);
  const [showAccount, setShowAccount] = useState(false);
  const loginClickHanlder = () => {
    if (loggedInUser) {
      setShowAccount(true);
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
            <button className='logo gradient hover:bg-green-400 p-2 sm:p-3 md:p-4'>
              Logo
            </button>
          </Link>
        </div>
        <div className='gradient hover:bg-green-400 p-2 sm:p-3 md:p-4'>
          <label className='hidden sm:inline md:inline' htmlFor='search'>
            search:
          </label>
          <input className='rounded-md w-24' id='search' type='search' />
        </div>
        <div>
          <Link to='/login'>
            <button
              onClick={loginClickHanlder}
              className='gradient hover:bg-green-400 p-2 sm:p-3 md:p-4'
            >
              {loggedInUser ? `Account` : 'log In'}
            </button>
          </Link>
        </div>
        <div>
          <Link to='/cart'>
            <button className='gradient hover:bg-green-400 p-2 sm:p-3 md:p-4'>
              Cart
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
