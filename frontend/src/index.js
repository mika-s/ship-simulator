import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxStore from './redux.store';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './vendor/bootstrap.min.css';
import './vendor/fontawesome.min.css';
import './vendor/fa-solid.min.css';

ReactDOM.render(
  (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
);
registerServiceWorker();
