import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class ProjectFormEntry extends React.Component {
  constructor(props) {
    super(props);
    this.getValidationState = this.getValidationState.bind(this);
  }

  getValidationState(name) {
    const length = this.props.value[name].length;
    if (length > 0) {
      return 'success';
    }
  }

  render() {
    const { entry, value, handleInputChange } = this.props;
    return (
      <FormGroup
        controlId="formBasicText"
        validationState={entry.validation ? this.getValidationState(entry.name) : null}
      >
        <ControlLabel>{entry.title}</ControlLabel>
        <FormControl
          name={entry.name}
          type='text'
          value={value[entry.name]}
          placeholder={entry.title}
          onChange={handleInputChange}
        />
        <FormControl.Feedback />
        {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
      </FormGroup>
    );
  }
}

export default ProjectFormEntry;
