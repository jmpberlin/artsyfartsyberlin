import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState(null);
  const onShowFilterBar = () => {
    props.showFilter();
  };

  useEffect(() => {
    const searchFieldTimer = setTimeout(() => {
      if (searchInput !== null) {
        axios
          .get(`/api/items/searchBarItems?search=${searchInput}`)
          .then((resFromDb) => {
            props.receiveArticlesFromSearch(resFromDb.data.articles);
          });
      }
    }, 500);
    return () => {
      clearTimeout(searchFieldTimer);
    };
  }, [searchInput, props]);

  const searchbarChangeHandler = (e) => {
    const input = e.target.value;
    setSearchInput(input);
  };
  return (
    <div className='bg-gray-400 rounded hover:bg-gray-400 p-2 sm:p-3 md:p-4'>
      <label className='hidden sm:inline md:inline' htmlFor='search'>
        search:
      </label>
      <input
        onChange={searchbarChangeHandler}
        onClick={onShowFilterBar}
        className='rounded-md w-24'
        id='search'
        type='search'
      />
    </div>
  );
};

export default SearchBar;
