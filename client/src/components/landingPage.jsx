import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ProjectEntry from '../components/projectEntry.jsx';

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.handleProjectFetching('landing page');
  }

  render() {
    return (
      <div className='ui grid' style={{backgroundColor: 'rgb(252, 252, 252)'}}>
        <div className='row centered landing_page'>
          <div className='row centered' style={{textAlign: 'center', marginTop: '140px'}}>
            <div className='eight wide column centered'>
              <h2 style={{fontSize: '60px'}}>Platform of ideas.</h2>
            </div>
            <div className='ui centered' style={{borderBottom: '2px solid rgb(240, 95, 64)', width: '25%'}}></div>
          </div>
          <div className='row centered start_project_btn'>
            <Button className='get-started' as={Link} to='/create'>GET STARTED!</Button>
          </div>
        </div>
        <div className='ui grid container project-miniview'>
          <div className='row centered'>
            <h2>Most Popular Projects</h2>
            <div style={{border: '1px solid rgb(240, 95, 64)', width: '50px', left: '50%', marginLeft: '-25px', position: 'absolute'}}></div>
          </div>
          <div className='row project-miniview-content'>
            {this.props.projects.content.map((project, index) => <ProjectEntry project={project} key={index}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
