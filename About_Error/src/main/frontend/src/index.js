import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import {composeWithDevTools} from 'redux-devtools-extension';

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);