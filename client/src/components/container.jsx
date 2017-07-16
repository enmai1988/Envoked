import React from 'react';
import ProjectEntry from './projectEntry.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { styles } from '../styles';

class Container extends React.Component {
  render() {
    console.log(this.props.projects);
    return (
      <div className='container'>
        <div className='row justify-content-center landing_page clearfix'>
          <div className='start_project_btn'>
            <LinkContainer to='/project'>
              <Button bsSize="large" block>Start a Project</Button>
            </LinkContainer>
          </div>
        </div>
        <div className='row justify-content-md-center project_miniview'>
          {this.props.projects.content.map((project, index) => <ProjectEntry project={project} key={index}/>)}
        </div>
      </div>
    );
  }
}

export default Container;
