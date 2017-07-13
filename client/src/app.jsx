import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/layout.jsx';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Layout />
    );
  }
}

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
