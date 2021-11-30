import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import AccountMenu from './AccountMenu';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import FilterBar from '../Search/FilterBar';
import SearchBar from '../Search/SearchBar';

const MainNavbar = (props) => {
  const [userLogin, setUserlogin] = useState(false);
  const [userRegister, setUserRegister] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(props.currentUser);
  const [showAccount, setShowAccount] = useState(false);
  const [showFilterComponent, setShowFilterComponent] = useState(false);

  // here goes the new logic
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

  // Show and Hide Filter Bar
  const onCloseFilterBar = () => {
    setShowFilterComponent(false);
  };
  const onShowFilterHandler = () => {
    setShowFilterComponent(true);
  };
  const receiveArticlesFromSearchHandler = (articles) => {
    props.receiveArticlesFromNavbar(articles);
  };
  return (
    <div>
      <div className='border border-black rounded p-2 m-2 text-center'>
        <div className='flex justify-evenly items-center asad flex-row mb-2'>
          <div>
            <Link to='/'>
              <button className='bg-gray-400 p-2 sm:p-3 md:p-4 text-xs rounded'>
                ARTSY
                <hr />
                FARTSY
              </button>
            </Link>
          </div>
          <SearchBar
            showFilter={onShowFilterHandler}
            receiveArticlesFromSearch={receiveArticlesFromSearchHandler}
          ></SearchBar>
          <div>
            <button
              onClick={loginClickHanlder}
              className='bg-gray-400 rounded hover:bg-gray-400 p-2 sm:p-3 md:p-4'
            >
              {loggedInUser ? `Account` : 'log In'}
            </button>
          </div>
          <div>
            <Link to='/cart'>
              <button className='bg-gray-400 rounded hover:bg-gray-400 p-2 sm:p-3 md:p-4'>
                Cart
                <NotificationBadge
                  count={props.itemCartCount}
                  effect={Effect.SCALE}
                />
              </button>
            </Link>
          </div>
        </div>
        <div>
          <p>...your no.1 Art-Shop!</p>
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
      {showFilterComponent && (
        <FilterBar closeFilterBar={onCloseFilterBar}></FilterBar>
      )}
    </div>
  );
};

export default MainNavbar;
