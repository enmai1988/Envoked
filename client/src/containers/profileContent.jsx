import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/projectActions.js';
import ProfileContentList from '../components/profileContentList.jsx';

class ProfileContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab1: 'active',
      tab2: null
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    // this.props.fetchProjects({ params: { origin: location.pathname } });
    this.props.fetchProjects({ params: { origin: this.state.activeKey } });
    console.log('ProfileContent: ', this.props.projects);
  }

  handleSelect(e) {
    console.log(e.target);
    e.target.className = 'nav-link active';
  }

  render() {
    const tabs = [
      { className: 'nav-link', title: 'My Projects' },
      { className: 'nav-link', title: 'Projects you may like' }
    ];

    return (
      <div className='col-md profile-tabs-container'>
        <ul className='nav nav-tabs profile-tabs'>
          {tabs.map((tab, index) =>
            <li className='nav-item profile-tabs-item' key={index} onClick={this.handleSelect}>
              <a className={tab.className} href='#'>{tab.title}</a>
            </li>
          )}
        </ul>
        <div className='col-md-8 col-md-offset-2 profile-content'>
          <ProfileContentList projects={this.props.projects.content}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ projects: state.projects });

const mapDispatchToProps = dispatch => ({
  fetchProjects: (option) => dispatch(fetchProjects(option))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContent));
