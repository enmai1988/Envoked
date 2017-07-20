import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/projectActions.js';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('profile: ', this.props.user);
    this.props.handleProjectFetching();
  }

  render() {
    console.log('ProfilePage:', this.props.projects);
    let { firstName, lastName, avatar } = this.props.user;
    return (
      <div className='container profile-container'>
        <div className='row'>
          <div className='col-md-4 col-md-offset-4 profile-top'>
            <div className='col-md-2'>
              <img src={avatar}></img>
            </div>
            <div className='col-md-10'>
              <span>Good morning,</span>
              <span>{`${this.props.user.firstName} ${this.props.user.lastName}`}</span>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8 col-md-offset-2 profile-content'>

          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({ projects: state.projects });
//
// const mapDispatchToProps = dispatch => ({
//   fetchProjects: (option) => dispatch(fetchProjects(option))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

export default ProfilePage;
