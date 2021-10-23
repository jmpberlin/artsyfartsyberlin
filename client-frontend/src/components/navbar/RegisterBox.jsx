import React from 'react';
import { useState } from 'react';

import axios from 'axios';
import ErrorMessage from './ErrorMessage';
const RegisterBox = (props) => {
  const onLoginHandler = () => {
    props.onLogin();
  };
  // storing the Input
  const [email, setEmail] = useState('');
  // checking if Email is valid and storing the Value respectively
  const [emailIsValid, setEmailIsValid] = useState(false);
  //storing the Passwordvalue
  const [passwordUnhashed, setPassword] = useState('');
  //checking if Password is valid and storing the boolean respectively
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  // setting the whole form to valid/unvalid
  const [formIsValid, setFormIsValid] = useState(false);
  //
  const [error, setError] = useState(false);

  // Regular Expression to check wether the email format is valid
  const regExEmailCheck = (str) => {
    const emailRegEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailCheck = emailRegEx.test(str);
    return emailCheck;
  };

  // regular Expression to check wether the password is valid
  const regExPasswordCheck = (str) => {
    const passwordRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    let passwordCheck = passwordRegEx.test(str);
    return passwordCheck;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post('/auth/signup', { email, passwordUnhashed })
      .then((resFromBackend) => {
        if (!resFromBackend.data.success) {
          setError({ message: 'this email-address is already taken!' });
          setEmail('');
          setPassword('');
          setFormIsValid(false);
          setPasswordIsValid(false);
        }
        if (resFromBackend.data.success) {
          props.onRegisterSuccess();
        }
      });
  };
  const onEmailChangeHandler = (e) => {
    if (email.trim().length) {
      setError(null);
    }
    let input = e.target.value;
    setEmail(input);
    if (email.trim().length) {
      setError(null);
    }
    let check = regExEmailCheck(input);
    if (check) {
      setEmailIsValid(true);
      if (passwordIsValid) {
        setFormIsValid(true);
      }
    } else {
      setEmailIsValid(false);
      setFormIsValid(false);
    }
  };
  const onPasswordChangeHandler = (e) => {
    const input = e.target.value;
    setPassword(input);
    let check = regExPasswordCheck(input);
    if (check) {
      setPasswordIsValid(true);
      if (emailIsValid) {
        setFormIsValid(true);
      }
    } else {
      setPasswordIsValid(false);
      setFormIsValid(false);
    }
  };
  return (
    <>
      <div className='borderbox flexwrapper'>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor='email'>Username:</label>
          <input
            className='border-2 m-2'
            onChange={onEmailChangeHandler}
            type='email'
            name='email'
            id='email'
            value={email}
          />
          <br />
          <label htmlFor='password'>Password:</label>
          <input
            className='border-2 m-2'
            onChange={onPasswordChangeHandler}
            value={passwordUnhashed}
            type='password'
            name='passwordUnhashed'
            id='password'
          />
          <br />
          {error && <ErrorMessage msg={error.message}></ErrorMessage>}
          <button
            disabled={!formIsValid}
            className='gradient hover:bg-green-400 p-2 sm:p-3 md:p-4 disabled:opacity-50'
            type='submit'
          >
            create account!
          </button>
        </form>
      </div>
      <div className='borderbox flexwrapper'>
        <h4>Already got an Account?</h4>
        <button
          className='gradient hover:bg-green-400 p-2 sm:p-3 md:p-4'
          onClick={onLoginHandler}
        >
          Log In
        </button>
      </div>
    </>
  );
};

export default RegisterBox;
