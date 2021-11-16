import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/auth-context';
import axios from 'axios';


axios
  .get('/checkuser')
  .then((res) => {
    ReactDOM.render(
      <Router>
        <AuthContextProvider>
          <App currentUser={res.data.currentUser} />
        </AuthContextProvider>
      </Router>,
      document.getElementById('root')
    );
  })
  .catch((err) => {
    alert('backend not running or /checkuser route not defined !');
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
