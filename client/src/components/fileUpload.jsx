import React from 'react';
import filestack from 'filestack-js';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount() {
    const apikey = 'AjcTDrnNSKWZY48TkFUHPz';
    this.client = filestack.init(apikey);
  }

  handleFileUpload(e) {
    e.preventDefault();
    this.client.pick({
      accept: 'image/*',
      maxFiles: 1,
    }).then(result => {
      this.props.updateInput('imageURL', result.filesUploaded[0].url);
    });
  }

  render() {
    return (
      <div className='col-md-9' onClick={this.handleFileUpload}>
        {this.props.imageURL ?
          <div className='project-image-picker-box image-uploaded'>
            <img src={this.props.imageURL}></img>
          </div>
          :
          <div className='project-image-picker-box'>
            <span className='center'>This is first thing people will see</span>
            <input type='button' className='project-image-picker'></input>
          </div>
        }
      </div>
    );
  }
}

export default FileUpload;
