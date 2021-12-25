import React from 'react';
import ReactDOM from 'react-dom';
// import './index.scss';
import App from './components/App/App';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from './store/reducers/rootReducer';

// const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

