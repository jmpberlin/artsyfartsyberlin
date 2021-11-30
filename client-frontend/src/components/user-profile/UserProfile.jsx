import React, { useState, useEffect } from 'react';
import axios from 'axios';
import spinner from './spinner.gif';
import UserErrorModal from './ErrorModal/UserErrorModal';
import UserDetails from './ErrorModal/UserDetails';

const UserProfile = (props) => {
  // const userId = props.match.params.id;
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const onHideOverlayHandler = () => {
    setError(false);
  };
  const refreshHandler = () => {
    axios.get('/api/isUserLoggedIn').then((resFromDb) => {
      if (resFromDb.data.loggedIn) {
        setUser((prevState) => {
          return resFromDb.data.user;
        });
      }
      if (!resFromDb.data.loggedIn) {
        setError(true);
      }
    });
  };

  useEffect(() => {
    axios.get('/api/isUserLoggedIn').then((resFromDb) => {
      if (resFromDb.data.loggedIn) {
        setUser((prevState) => {
          return resFromDb.data.user;
        });
      }
      if (!resFromDb.data.loggedIn) {
        setError(true);
      }
    });
  }, []);
  if (user === null && error === false) {
    return <img alt='spinner gif' src={spinner}></img>;
  }

  return (
    <div>
      <UserDetails
        refreshParentComponent={refreshHandler}
        user={user}
      ></UserDetails>

      {error && (
        <UserErrorModal
          message="You are not Logged in! Please Log in or Sign up, if you don't have an account yet."
          button='yooo, das hab ich wohl verstanden. '
          hideOverlay={onHideOverlayHandler}
        ></UserErrorModal>
      )}
    </div>
  );
};

export default UserProfile;
