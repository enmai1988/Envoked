import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProject } from '../actions/projectPageActions.js';
import ProjectPageMain from '../components/projectPageMain.jsx';
import Payment from './payment.jsx';
import Spinner from '../components/spinner.jsx';
import axios from 'axios';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);

    this.sendContactRequest = this.sendContactRequest.bind(this);
  }

  componentDidMount() {
    let userId = this.props.match.params.userId;
    let project = this.props.match.params.project;
    this.props.fetchProject(`${userId}/${project}`);
  }

  sendContactRequest(e) {
    console.log('send request');
    e.preventDefault();
    axios.post('/api/notifications', { id: this.props.projectPage.content.user.id })
      .then(response => {
        console.log('add contact: ', response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let sessionOwner = this.props.user;
    let fetched = this.props.projectPage.fetched;
    let project = this.props.projectPage.content;

    return (
      <div className='container project-page'>
        {fetched ?
          <div>
            <div className='col-md-6 project-page-left'>
              <ProjectPageMain
                project={project}
                user={sessionOwner}
                match={this.props.match}
              />
            </div>
            <div className='col-md-3 project-page-right'>
              <div className='row col-md'>
                <span>{`${project.user.firstName} ${project.user.lastName}`}</span>
                <button onClick={this.sendContactRequest}>add contact</button>
              </div>
              <Payment />
            </div>
          </div> :
          <Spinner style={{marginTop: '150px'}}/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({ projectPage: state.projectPage });

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProject(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectPage));
