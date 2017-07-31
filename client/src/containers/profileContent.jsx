import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/projectActions.js';
import { selectTab } from '../actions/tabsActions.js';
import ProfileContentList from '../components/profileContentList.jsx';
import Spinner from '../components/spinner.jsx';
import _ from 'underscore';

class ProfileContent extends React.Component {
  constructor(props) {
    super(props);

    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  componentDidMount() {
    _.each(this.props.tabs, (value, key) => {
      if (value.includes('active')) {
        this.handleTabSelect(null, key);
      }
    });
  }

  handleTabSelect(e, key) {
    let origin;
    if (e) {
      this.props.selectTab(e.target.name);
      key = e.target.name;
    }
    if (key === '0') {
      origin = 'my projects';
    } else if (key === '1') {
      origin = 'projects you may like';
    }
    this.props.fetchProjects({ params: { origin } });
  }

  render() {
    const tabs = [
      { title: 'My Projects' },
      { title: 'Projects you may like' }
    ];

    return (
      <div className='col-md profile-tabs-container'>
        <ul className='nav nav-tabs profile-tabs'>
          {tabs.map((tab, index) =>
            <li className='nav-item profile-tabs-item' key={index} onClick={this.handleTabSelect}>
              <button className={this.props.tabs[index]} name={`${index}`}>{tab.title}</button>
            </li>
          )}
        </ul>
        <div className='col-md-8 col-md-offset-2 profile-content'>
          {this.props.projects.fetched ?
            <ProfileContentList projects={this.props.projects.content}/> :
            <Spinner style={{marginTop: '50px'}}/>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ projects: state.projects, tabs: state.tabs });

const mapDispatchToProps = dispatch => ({
  fetchProjects: (option) => dispatch(fetchProjects(option)),
  selectTab: (tabName) => dispatch(selectTab(tabName))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContent);
