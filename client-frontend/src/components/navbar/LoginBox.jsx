import React from 'react';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

import axios from 'axios';

const LoginBox = (props) => {
  const onRegisterHandler = () => {
    props.onRegister();
  };

  const [email, setEmail] = useState('');
  const [passwordUnhashed, setPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
      if (email.length > 0) {
        setError(null);
      }
      if (email.trim().length > 0) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    }
    if (e.target.name === 'passwordUnhashed') {
      setPassword(e.target.value);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('/auth/login', { email, passwordUnhashed }).then((resFromDb) => {
      if (resFromDb.data.success) {
        props.onLoginSuccess();
      }
      if (resFromDb.data.success === false) {
        setError({ msg: resFromDb.data.message });
        setPassword('');
      }
    });
  };
  return (
    <>
      <div className='borderbox flexwrapper'>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor='email'>Email:</label>
          <input
            className='border-2 m-2'
            onChange={onChangeHandler}
            type='email'
            name='email'
            id='email'
            value={email}
          />
          <br />
          <label htmlFor='password'>Password:</label>
          <input
            className='border-2 m-2'
            onChange={onChangeHandler}
            type='password'
            name='passwordUnhashed'
            id='password'
            value={passwordUnhashed}
          />

          <br />
          {error && <ErrorMessage msg={error.msg}></ErrorMessage>}
          <br />
          <button
            disabled={!formIsValid}
            className='gradient hover:bg-green-400 p-2 sm:p-3 md:p-4 disabled:opacity-50'
            type='submit'
          >
            Log in
          </button>
        </form>
      </div>
      <div className='borderbox flexwrapper'>
        <h4>No Account yet? </h4>
        <button
          className='gradient hover:bg-green-400 p-2 sm:p-3 md:p-4'
          onClick={onRegisterHandler}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default LoginBox;
