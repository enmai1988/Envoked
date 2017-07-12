import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Layout from './components/layout.jsx';

injectTapEventPlugin();

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MuiThemeProvider>
        <Layout />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
