import React from 'react';
import css from '../../../public/css/sidebar.css';
import { connect } from 'react-redux';
import { fetchContacts } from '../actions/contactActions.js';
import { Link } from 'react-router-dom';
import { debounce } from 'underscore';
import ContactList from '../components/contactList.jsx';
import axios from 'axios';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight
    };

    this.updateInnerHeight = this.updateInnerHeight.bind(this);
    this.fetchContacts = this.fetchContacts.bind(this);
    this._fetchContacts = debounce(this.fetchContacts, 500);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchContacts();
    window.addEventListener('resize', this.updateInnerHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateInnerHeight);
  }

  fetchContacts(keyword = '') {
    this.props.fetchContacts({ params: { keyword } });
  }

  handleSearch(e) {
    this._fetchContacts(e.target.value);
  }

  updateInnerHeight() {
    this.setState({ height: window.innerHeight });
  }

  render() {
    return (
      <div id="sidebar-wrapper" className='ui grid'>
        <div className='row sidebar-top'>
          <input type="text"
            className="form-control"
            placeholder="Search contacts"
            onChange={this.handleSearch}
          ></input>
        </div>
        <div className='row sidebar-main' style={{height: `${this.state.height - 80}px`}}>
          <ContactList contacts={this.props.contacts.content} startVideoChat={this.props.startVideoChat}/>
        </div>
        <div className='row sidebar-bottom'>
          <div>
            <a href='/auth/logout' style={{color: 'white', textDecoration: 'none'}}>Logout</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ contacts: state.contacts });

const mapDispatchToProps = dispatch => ({
  fetchContacts: (option) => dispatch(fetchContacts(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
