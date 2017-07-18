import React from 'react';
import { connect } from 'react-redux';
import { updateProjectForm } from '../actions/newProjectActions.js';
import { createProject } from '../actions/formActions.js';
import { Button } from 'react-bootstrap';
import filestack from 'filestack-js';
import ProjectFormEntry from '../components/projectFormEntry.jsx';
import ProjectPageMini from '../components/projectPageMini.jsx';

class ProjectSubmission extends React.Component {
  constructor(props) {
    super(props);

    this.apikey = 'AjcTDrnNSKWZY48TkFUHPz';
    this.client = filestack.init(this.apikey);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(e) {
    e.preventDefault();
    this.client.pick({
      accept: 'image/*',
      maxFiles: 1,
    }).then(result => {
      console.log(result.filesUploaded);
      this.props.updateProjectForm('image', result.filesUploaded[0].url);
    });
  }

  handleInputChange(e) {
    let input = e.target.value;
    let field = e.target.name;
    this.props.updateProjectForm(field, input);
  }

  handleCreate() {
    let form = this.props.form;
    form.userId = this.props.user.id;
    console.log('submitting project: ', form);
    this.props.createProject(form);
  }

  render() {
    const entries = [
      { name: 'appName', title: 'Project title' },
      { name: 'url', title: 'Project URL' },
      { name: 'byline', title: 'Byline' },
      { name: 'location', title: 'Project location' },
      { name: 'description', title: 'Project description' },
      { name: 'companyName', title: 'Company name' },
      { name: 'fundingGoal', title: 'Funding goal' },
      { name: 'coFounders', title: 'Co-founders' }
    ];

    return (
      <div className='container project-submission-container'>
        <div className='row col-md project-submission-title'>
          <h2>Let's create your project</h2>
        </div>
        <div className='col-md-8 project-submission-main'>
          <div className='row project-submission-entry file-upload'>
            <div className='col-md-3'>
              <span>Project image</span>
            </div>
            <div className='col-md-9' onClick={this.handleFileUpload}>
              {this.props.form.image ?
                <div className='project-image-picker-box image-uploaded'>
                  <img src={this.props.form.image}></img>
                </div>
                :
                <div className='project-image-picker-box'>
                  <span className='center'>This is first thing people will see</span>
                  <input type='file' className='project-image-picker'></input>
                </div>
              }
            </div>
          </div>
          {entries.map((entry, index) =>
            <ProjectFormEntry entry={entry} handleInputChange={this.handleInputChange} key={index} inputValue={this.props.form[entry.name]}/>
          )}
        </div>
        <div className='col-md-4 project-submission-side'>
          <ProjectPageMini formData={this.props.form} user={this.props.user}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ form: state.projectCreation, formControl: state.formControl });

const mapDispatchToProps = dispatch => ({
  updateProjectForm: (field, value) => dispatch(updateProjectForm(field, value)),
  createProject: form => dispatch(createProject(form))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSubmission);
