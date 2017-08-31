import React from 'react';
import ReactDOM from 'react-dom';
import css from '../../public/css/styles.css';
import App from './containers/app.jsx';
import { Provider } from 'react-redux';
import store from './store';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));
