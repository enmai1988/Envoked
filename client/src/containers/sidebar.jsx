import React from 'react';
import css from '../../../public/css/sidebar.css';
import { connect } from 'react-redux';
import { fetchContacts } from '../actions/contactActions.js';
import { Link } from 'react-router-dom';
import { debounce } from 'underscore';
import ContactList from '../components/contactList.jsx';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.fetchContacts = this.fetchContacts.bind(this);
    this._fetchContacts = debounce(this.fetchContacts, 500);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts(keyword = '') {
    this.props.fetchContacts({ params: { keyword } });
  }

  handleSearch(e) {
    this._fetchContacts(e.target.value);
  }

  render() {
    return (
      <div id="sidebar-wrapper">
        <div className='row col-md sidebar-top no-margin'>
          <input type="text"
            className="form-control"
            placeholder="Search contacts"
            onChange={this.handleSearch}
          ></input>
        </div>
        <div className='row col-md sidebar-main no-margin'>
          <ContactList contacts={this.props.contacts.content}/>
        </div>
        <div className='row col-md sidebar-bottom no-margin'>
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
