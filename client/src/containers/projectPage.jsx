import React from 'react';
import { connect } from 'react-redux';
import { fetchProject } from '../actions/projectPageActions.js';


class ProjectPage extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.id);
  }

  render() {
    console.log(this.props);
    let sessionOwner = this.props.user;
    let fetched = this.props.projectPage.fetched;
    let { id, appName, byline, images, description, companyName, user } = this.props.projectPage.content;
    return (
      <div className='container project-page'>
        {
          fetched ?
            <div>
              <div className='col-md-3 project-content left'>
                <div className='row fix'>
                  <div className='col-md user-info'>
                    <img className='avatar' src={user.avatar}></img>
                    <span>By {`${user.firstName} ${user.lastName}`}</span>
                  </div>
                </div>
              </div>
              <div className='col-md-6 project-content mid'>
                <div className='row justify-content-center img-holder'>
                  {images.map((image, index) => <img src={`/assets/screenshots/${image.full}`} key={index}></img>)}
                </div>
                <div className='row justify-content-center'>

                </div>
              </div>
              <div className='col-md-3 project-content right'>

              </div>
            </div>
            :
            <div>loading...</div>
        }

      </div>
    );
  }
}

const mapStateToProps = state => ({ projectPage: state.projectPage });

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProject(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
