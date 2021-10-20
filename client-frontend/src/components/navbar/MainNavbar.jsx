import React from 'react';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  return (
    <div className='borderbox flexwrapper'>
      <div>
        <Link to='/home'>
          <button className='logo gradientbackground hover:bg-purple-700  p-2 sm:p-3 md:p-4'>
            Logo
          </button>
        </Link>
      </div>
      <div className='gradientbackground hover:bg-purple-700 p-2 sm:p-3 md:p-4'>
        <label className='hidden sm:inline md:inline' htmlFor='search'>
          search:
        </label>
        <input className='' id='search' type='search' />
      </div>
      <div>
        <Link to='/login'>
          <button className='gradientbackground hover:bg-purple-700 p-2 sm:p-3 md:p-4'>
            logIn
          </button>
        </Link>
      </div>
      <div>
        <Link to='/cart'>
          <button className='gradientbackground hover:bg-purple-700 p-2 sm:p-3 md:p-4'>
            Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainNavbar;
