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
  // selectedTopic holds the box, that is going to be displayed, depending on numbers
  const [selectedTopic, setSelectedTopic] = useState(0);
  // this state holds the information for the button, if the user is logged in
  const [loggedIn, setLoggedIn] = useState(props.currentUser);

  //this function handles all menu clicks

  const menuHandler = (topicNum) => {
    if (selectedTopic === topicNum) {
      setSelectedTopic(0);
    } else {
      setSelectedTopic(topicNum);
    }
  };
  // ON REGISTER, LOGIN OR LOGOUT THESE THREE HANDLERS ARE BEING CALLED
  const onRegisterSuccessHandler = () => {
    menuHandler(0);
    setLoggedIn(true);
  };
  const onLogoutHandler = () => {
    setLoggedIn(false);
    menuHandler(0);
  };
  const loginSuccessHandler = () => {
    menuHandler(0);
    setLoggedIn(true);
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
            showFilter={menuHandler}
            receiveArticlesFromSearch={receiveArticlesFromSearchHandler}
          ></SearchBar>
          <div>
            <button
              onClick={() => {
                if (!loggedIn) {
                  menuHandler(2);
                } else {
                  menuHandler(4);
                }
              }}
              className='bg-gray-400 rounded hover:bg-gray-400 p-2 sm:p-3 md:p-4'
            >
              {loggedIn ? `Account` : 'log In'}
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
      {selectedTopic === 1 && (
        <FilterBar closeFilterBar={menuHandler}></FilterBar>
      )}
      {selectedTopic === 2 && (
        <LoginBox
          showRegister={menuHandler}
          onLoginSuccess={loginSuccessHandler}
        ></LoginBox>
      )}
      {selectedTopic === 3 && (
        <RegisterBox
          showLogin={menuHandler}
          onRegisterSuccess={onRegisterSuccessHandler}
        ></RegisterBox>
      )}
      {selectedTopic === 4 && (
        <AccountMenu onLogout={onLogoutHandler}></AccountMenu>
      )}
    </div>
  );
};

export default MainNavbar;
