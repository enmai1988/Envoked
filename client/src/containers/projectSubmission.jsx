import React from 'react';
import { connect } from 'react-redux';
import { updateProjectForm } from '../actions/newProjectActions.js';
import { createProject } from '../actions/formActions.js';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ProjectFormEntry from '../components/projectFormEntry.jsx';

class ProjectSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleInputChange(e) {
    let input = e.target.value;
    let field = e.target.name;
    this.props.updateProjectForm(field, input);
  }

  handleCreate() {
    console.log(this.props);
    const form = this.props.form;
    this.props.createProject(form);
  }

  render() {
    const entries = [
      {
        title: 'Project name',
        name: 'name',
        validation: true
      },
      {
        title: 'Project URL',
        name: 'url',
        validation: false
      },
      {
        title: 'Byline',
        name: 'byline',
        validation: false
      },
      {
        title: 'Company name',
        name: 'companyName',
        validation: false
      },
      {
        title: 'Location',
        name: 'location',
        validation: false
      },
      {
        title: 'Target Users',
        name: 'targetUsers',
        validation: false
      },
      {
        title: 'Technologies',
        name: 'technologies',
        validation: false
      },
      {
        title: 'Co-founders',
        name: 'coFounders',
        validation: false
      }
    ];
    return (
      <div className='create_project'>
        <form>
          {entries.map((entry, index) =>
            <ProjectFormEntry
              entry={entry}
              handleInputChange={this.handleInputChange}
              value={this.props.form}
              key={index}
            />)}
        </form>
        <Button bsSize="large" block onClick={this.handleCreate}>Create</Button>
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
