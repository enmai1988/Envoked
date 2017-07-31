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
  }

  componentDidMount() {
    let userId = this.props.match.params.userId;
    let project = this.props.match.params.project;
    this.props.fetchProject(`${userId}/${project}`);
  }

  render() {
    let sessionOwner = this.props.user;
    let fetched = this.props.projectPage.fetched;
    let project = this.props.projectPage.content;
    return (
      <div className='container project-page'>
        {
          fetched ?
            <ProjectPageMain
              project={project}
              match={this.props.match}
              sendContactRequest={this.props.sendContactRequest}
            /> :
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
