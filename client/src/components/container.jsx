import React from 'react';
import ProjectEntry from '../components/projectEntry.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

const Container = ({ projects }) => (
  <div className='container'>
    <div className='row justify-content-center landing_page clearfix'>
      <div className='col-md start_project_btn'>
        <LinkContainer to='/create'>
          <Button bsSize="large" block>Start a Project</Button>
        </LinkContainer>
      </div>
    </div>
    <div className='row justify-content-md-center project_miniview'>
      {projects.content.map((project, index) => <ProjectEntry project={project} key={index}/>)}
    </div>
  </div>
);

export default Container;
