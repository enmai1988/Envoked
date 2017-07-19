import React from 'react';
import { connect } from 'react-redux';
import { updateProjectForm } from '../actions/newProjectActions.js';
import { createProject } from '../actions/formActions.js';
import { Button } from 'react-bootstrap';
import filestack from 'filestack-js';
import ProjectFormEntry from '../components/projectFormEntry.jsx';
import ProjectPageMain from '../components/projectPageMain.jsx';

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
      this.props.updateProjectForm('imageURL', result.filesUploaded[0].url);
    });
  }

  handleInputChange(e) {
    let input = e.target.value;
    let field = e.target.name;

    this.props.updateProjectForm(field, input);
  }

  handleCreate() {
    let form = this.props.form;
    let n = Array.from(form);
    form.userId = this.props.user.id;
    console.log('submitting project: ', form);
    this.props.createProject(form);
  }

  render() {
    const entries = [
      { name: 'appName', title: 'Project title' },
      { name: 'byline', title: 'Byline' },
      { name: 'url', title: 'Project URL' },
      { name: 'location', title: 'Project location' },
      { name: 'description', title: 'Project description' },
      { name: 'companyName', title: 'Company name' },
      { name: 'fundingGoal', title: 'Funding goal' },
      { name: 'coFounders', title: 'Co-founders' }
    ];

    return (
      <div className='container project-submission-container clearfix'>
        <div className='row col-md project-submission-title clearfix'>
          <h2>Let's create your project</h2>
          <button type='button' className='btn project-submission-btn'>Save</button>
        </div>
        <div className='col-md-8 project-submission-main clearfix'>
          <div className='row project-submission-entry file-upload'>
            <div className='col-md-3'>
              <span>Project image</span>
            </div>
            <div className='col-md-9' onClick={this.handleFileUpload}>
              {this.props.form.imageURL ?
                <div className='project-image-picker-box image-uploaded'>
                  <img src={this.props.form.imageURL}></img>
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
        <div className='col-md-4 project-submission-side clearfix'>
          <ProjectPageMain formData={this.props.form} user={this.props.user}/>
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
