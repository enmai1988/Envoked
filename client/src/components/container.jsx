import React from 'react';
import ProjectEntry from './projectEntry.jsx';
import { Button } from 'react-bootstrap';
import { styles } from '../styles';

class Container extends React.Component {
  render() {
    return (
      <div id='main'>
        <div className='landing_page'>
          <div className='start_a_project'>
            <Button bsSize="large" block>Start a Project</Button>
          </div>
        </div>
        <div className='landing_page_project_preview'>
          {this.props.projects.content.map((project, index) => <ProjectEntry project={project} key={index}/>)}
        </div>
      </div>
    );
  }
}

export default Container;
