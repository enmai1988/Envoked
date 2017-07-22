import React from 'react';
import { Link } from 'react-router-dom';
import ProjectEntry from '../components/projectEntry.jsx';

class Container extends React.Component {
  componentDidMount() {
    this.props.handleProjectFetching();
  }

  render() {
    return (
      <div className='container'>
        <div className='row justify-content-center landing_page clearfix'>
          <div className='col-md start_project_btn'>
            <Link to='/create'>
              <button className='get-started'>GET STARTED!</button>
            </Link>
          </div>
        </div>
        <div className='row col-md-10 col-md-offset-1 project-miniview'>
          <h2>Most Popular Projects</h2>
          <div style={{border: '1px solid rgb(240, 95, 64)', width: '50px', left: '50%', marginLeft: '-25px', position: 'absolute'}}></div>
          {this.props.projects.content.map((project, index) => <ProjectEntry project={project} key={index}/>)}
        </div>
      </div>
    );
  }
}

export default Container;
