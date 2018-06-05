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
import Checkbox from '@material-ui/core/Checkbox';
import AudioPlayer from './AudioPlayer'
import Notifier, { openSnackbar }  from './Notifier'

const FormContainer = styled.div`
   display:grid;
   grid-template-columns: repeat(1, 1fr);
   grid-gap: 10px;
   align-content: center;
   justify-content: center;
`;

const blankState = {
    submitor:'',
    title:'',
    description:'',
    email:'',
    name:'',
    submissionType: 'Your Work',
    audioURL:null,
    includeEmail: false,
    errors:{}
  }

const progressComponent = (props)=>(
  <p>Progress</p>
)
class SubmitForm extends Component {
  state = blankState

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  handleFinishedUpload(info){
    openSnackbar("Succesfully uploaded file")
    this.setState({audioURL: info.fileUrl, prog:null})
  }

  handleChange(name){
    return (event) => {
      this.setState({
        [name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      });
    };
  };

  createSubmission(){
    openSnackbar('Attempting to submit')
    fetch('/entry/', {
      method:"POST",
      body: JSON.stringify(this.state),
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors'
    }).then(()=>{
      this.setState(blankState)
      openSnackbar('Successfully submitted!')
    }).catch(()=>{
      openSnackbar('Something went wrong send us an email at longlivethenewsound@gmail.com')
    })
  }

  validateAndSubmit(){
    console.log('validating')
    const errors = ['submitor', 'title', 'email','description', 'submissionType', 'audioURL', 'acknowledgement'].reduce((errorHash, key)=>{
      if(!this.state[key] || this.state[key].length ==0){
        errorHash[key] = 'This is required field'
      }
      return errorHash
    }, {} )

    this.setState({errors},()=>{
      if(Object.values(this.state.errors).filter(a=>a).length==0){
        console.log('submitting')
        this.createSubmission()
      }
      else{
        openSnackbar("Make sure you filled out all the fields and checked the acknowledgement")
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

  renderDropzoneContent(){
    if(this.state.audioURL){
      return (<p style={{textAlign:'center'}}>
        {this.state.audioURL.split('/') [this.state.audioURL.split('/').length - 1]}
      </p>)
    }
    else if (this.state.prog){
      return (<p style={{textAlign:'center'}}> {this.state.prog} / 100 % </p>)
    }
    else if (this.state.errors.audioURL !== undefined){
      return (<p style={{color:'red', textAlign:'center'}}>You didn't submit a file</p>)
    }
    else{
      return ( <p style={{textAlign:'center'}}>
        Click here or drop a file to upload
      </p>)
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
          id='submitor'
          required
          label='Artist name / Alias / Organization'
          value={this.state.submitor}
          onChange={this.handleChange('submitor')}
          errorText={this.state.errors.submitor}
          error= {this.state.errors.submitor}
        />

        <TextField
          id='name'
          label='Your name (optional)'
          value={this.state.name}
          onChange={this.handleChange('name')}
        />

        <TextField
          id='title'
          required
          label='Title'
          value={this.state.title}
          onChange={this.handleChange('title')}
          errorText={this.state.errors.title}
          error={this.state.errors.title}
        />

        <TextField
          id='Description and/or credits (will appear in episode description along with artist name and optional contact information)'
          required
          label='Description'
          value={this.state.description}
          onChange={this.handleChange('description')}
          errorText={this.state.errors.description}
          error={this.state.errors.description}
        />

        <TextField
          id='email'
          required
          label='Contact Email'
          value={this.state.email}
          onChange={this.handleChange('email')}
          errorText={this.state.errors.email}
          error={this.state.errors.email}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.includeEmail}
              onChange={this.handleChange('includeEmail')}
              value="includeEmail"
            />
          }
          label="Include email in episode description (if left unchecked your email will not be made public)"
        />

        <TextField
          id='artistlink'
          label='Artist Link (optional)'
          value={this.state.artistLink}
          onChange={this.handleChange('artistLink')}
        />

        <TextField
          id='socialMedia'
          label='Social Media Link (optional)'
          value={this.state.socialMedia}
          onChange={this.handleChange('socialMedia')}
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

        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.acknowledgement}
              onChange={this.handleChange('acknowledgement')}
              value="acknowledgement"
              error = {this.state.errors.acknowledgement}
            />
          }
          error = {this.state.errors.acknowledgement}
          label="By submitting work you acknowledge that you are either the owner, or have the right to distribute submitted materials. LLtNS does not make money from the work submitted and artists do not make money from submitting materials to LLtNS. All rights remain with their original creator."
        />

        <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload.bind(this)}
            s3Url={'https://longlivethenewsound.s3.amazonaws.com/'}
            maxSize={1024 * 1024 * 5}
            upload={uploadOptions}
            accept="audio/*"
            style={{width:'100%', border:'1px dashed black'}}
            maxSize={10000000}
            onDone ={(d) => console.log('done ',d)}
            onProgress={(prog)=>{this.setState({prog:prog})}}
          >
          <div style={{boxSizing:'border-box', padding:'10px'}}>
            {this.renderDropzoneContent()}
          </div>

         </DropzoneS3Uploader>

        {this.renderSound()}
        <Button variant="raise" color="primary" onClick={()=>this.submit()} >Submit</Button>
      </FormContainer>
    );
  }
}

export default SubmitForm;
