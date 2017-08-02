import React from 'react';
import Radium from 'radium';
import { projectPageMainStyle } from '../styles';
import ContactRequestButton from './contactRequestButton.jsx';

const ProjectPageMain = ({ project, user, match, sendContactRequest, isContact }) => {
  let containerClass = 'container project-preview';
  let imageSrc = 'http://via.placeholder.com/350x197?text=Hello+world!';
  if (project.imageURL) { imageSrc = project.imageURL; }
  if (match.params.project) { containerClass = 'container project-main'; }

  return (
    <main>
      <article>
        <header>
          <div className='row col-md-8 col-md-offset-2' style={projectPageMainStyle.header}>
            <div className='col-md-3' style={{paddingTop: '20px', width: '23%'}}>
              <img src='/assets/user.png' style={{width: '60px', height: '60px'}}></img>
              <span style={{display: 'block', margin: '5px 0px', color: 'rgb(90,90,90)'}}>
                By <span style={{fontWeight: 'bold', color: 'rgb(53,53,53)'}}>{`${project.user.firstName} ${project.user.lastName}`}</span>
              </span>
              <ContactRequestButton sendContactRequest={sendContactRequest} isContact={isContact} match={match}/>
            </div>
            <div className='col-md-9' style={{verticalAlign: 'top'}}>
              <h2 style={{fontWeight: '500', marginBottom: '1.8rem'}}>{project.appName}</h2>
              <h4 style={{color: 'rgb(98, 99, 105)'}}>{project.blurb}</h4>
            </div>
          </div>
        </header>
        <section style={{marginTop: '20px'}}>
          <div className='col-md' style={{textAlign: 'center', width: '100%'}}>
            <img src={imageSrc} style={{width: '100%'}}></img>
          </div>
        </section>
        <section style={{marginTop: '60px'}}>
          <div className='col-md-6 col-md-offset-3'>
            <h3>About this project</h3>
            <p style={{whiteSpace: 'pre-wrap', marginTop: '15px'}}>{project.description}</p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Radium(ProjectPageMain);
