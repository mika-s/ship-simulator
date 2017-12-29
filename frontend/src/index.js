import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxStore from './redux.store';
import './index.css';
import './vendor/bootstrap.min.css';
import './vendor/fontawesome.min.css';
import './vendor/fa-solid.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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
