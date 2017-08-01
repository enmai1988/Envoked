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
            <Spinner style={{ marginTop: '150px' }} />
        }
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#paymentModal">Fund This Project!</button>

        <div id="paymentModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Payment</h4>
              </div>
              <div>
                <Payment />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

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
