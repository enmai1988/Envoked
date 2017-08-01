import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProject } from '../actions/projectPageActions.js';
import { isContact } from '../actions/isContactActions.js';
import { Button, Modal } from 'react-bootstrap';
import ProjectPageMain from '../components/projectPageMain.jsx';
import Payment from './payment.jsx';
import Spinner from '../components/spinner.jsx';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.userId = this.props.match.params.userId;
    this.project = this.props.match.params.project;
  }

  componentDidMount() {
    let userId = this.props.match.params.userId;
    let project = this.props.match.params.project;
    this.props.fetchProject(`${userId}/${project}`);

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
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

        <div>
          <Button bsStyle="primary" bsSize="large" onClick={this.open}>
            Fund This Project!
          </Button>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Fund This Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Payment />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
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
