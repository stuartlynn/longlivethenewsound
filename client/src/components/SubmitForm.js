import React, { Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AudioPlayer from './AudioPlayer'

const FormContainer = styled.div`
   display:grid;
   grid-template-columns: repeat(1, 1fr);
   grid-gap: 10px;
   align-content: center;
   justify-content: center;
`;

const blankState = {
    submitor:'',
    peiceName:'',
    peiceDescription:'',
    email:'',
    submissionType: 'Your Work',
    audioURL:null
  }

class SubmitForm extends Component {
  state = blankState

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  handleFinishedUpload(info){
    console.log('file info is ', info)
    console.log('File uploaded with filename', info.filename)
    console.log('Access it on s3 at', info.fileUrl)
    this.setState({audioURL: info.fileUrl})
  }

  handleChange(name){
    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  };

  createSubmission(){
    fetch('/entry/', {
      method:"POST",
      body: JSON.stringify(this.state),
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors'
    }).then(()=>{
      this.setState(blankState)
    })
  }
  validateAndSubmit(){
    const errors = ['submitor', 'peiceName', 'email', 'submissionType', 'file'].map((key)=>{
      if(!this.state[key] || this.state[key].length ==0){
        return `Misisng entry for ${key}`
      }
      else{
        return null
      }
    }).filter((a) => a)
    this.setState({errors},()=>{
      if(this.state.errors.length==0){
        this.createSubmission()
      }
    })
  }

  submit(){
    this.validateAndSubmit()
  }

  renderSound(){
    if(this.state.audioURL){
      return(
        <AudioPlayer
          trackTitle= {'name'}
          streamUrl = {this.state.audioURL}
        />
      )
    }
  }

  render() {
    const uploadOptions={
      s3path: '/submissions/',
      ContentType: "audio/wav"
    }
    return (
      <FormContainer>
        <TextField
          id='name'
          required
          label='Name'
          value={this.state.submitor}
          onChange={this.handleChange('submitor')}
        />

        <TextField
          id='peiceName'
          required
          label='Peice Name'
          value={this.state.peiceName}
          onChange={this.handleChange('peiceName')}
        />

        <TextField
          id='peiceDescription'
          required
          label='Peice Description'
          value={this.state.peiceDescription}
          onChange={this.handleChange('peiceDescription')}
        />

        <TextField
          id='email'
          required
          label='Contact Email'
          value={this.state.email}
          onChange={this.handleChange('email')}
        />
        <FormControl component="fieldset" required >

          <FormLabel  component="legend">Submission Type</FormLabel>
          <RadioGroup
            row
            value={this.state.submissionType}
            onChange={this.handleChange('submissionType')}>

            <FormControlLabel value="Your Work" control={<Radio color="primary" />} label="Your Work" />
            <FormControlLabel value="Submitted Work" control={<Radio color="primary" />} label="Someone elses work" />

          </RadioGroup>
        </FormControl>
        <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload.bind(this)}
            s3Url={'https://longlivethenewsound.s3.amazonaws.com/'}
            maxSize={1024 * 1024 * 5}
            upload={uploadOptions}
            accept="audio/*"
          />

        {this.renderSound()}
        <Button onClick={()=>this.submit()} >Submit</Button>
      </FormContainer>
    );
  }
}

export default SubmitForm;
