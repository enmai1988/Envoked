import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProject } from '../actions/projectPageActions.js';
import ProjectPageMain from '../components/projectPageMain.jsx';
import Payment from './payment.jsx';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.id);
  }

  render() {
    let sessionOwner = this.props.user;
    let fetched = this.props.projectPage.fetched;
    let project = this.props.projectPage.content;

    return (
      <div className='container project-page'>
        <div className='col-md-6 project-page-left'>
          {fetched ? <ProjectPageMain project={project} user={sessionOwner} match={this.props.match}/>
            : <div>loading</div>
          }
        </div>
        <div className='col-md-3 project-page-right'>
          <Payment />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ projectPage: state.projectPage });

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProject(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectPage));
