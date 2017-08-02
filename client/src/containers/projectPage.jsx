import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProject } from '../actions/projectPageActions.js';
import { isContact } from '../actions/isContactActions.js';
import ProjectPageMain from '../components/projectPageMain.jsx';
import Payment from './payment.jsx';
import Spinner from '../components/spinner.jsx';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);

    this.userId = this.props.match.params.userId;
    this.project = this.props.match.params.project;
  }

  componentDidMount() {
    this.props.fetchProject(`${this.userId}/${this.project}`);

    this.props.checkIfContact(this.userId);
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
              user={sessionOwner}
              isContact={this.props.isContact.isContact}
              sendContactRequest={this.props.sendContactRequest}
            /> :
            <Spinner style={{marginTop: '150px'}}/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({ projectPage: state.projectPage, isContact: state.isContact });

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProject(id)),
  checkIfContact: (id, sessionOwner) => dispatch(isContact(id, sessionOwner))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectPage));
