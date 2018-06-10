import React from 'react'
import ReactAudioPlayer from 'react-audio-player';
import Button from '@material-ui/core/Button';

const stateColors = {
  'pending' : 'blue',
  'approved' : 'green',
  'rejected' : 'red'
}

export default (props)=>(
  <div style={{width:'100%', marginTop:'20px'}}>
    <p>Title: {props.title}</p>
    <p>State: <span style={{color:stateColors[props.state]}}>{props.state}</span></p>
    <p>Description: {props.description}</p>
    <p>Sumbission Type: {props.submissionType}</p>
    <p>Artist Link: {props.artistLink}</p>
    <p>Social Link: {props.socialMedia}</p>
    <p>Gave permision: {props.acknowledgement}</p>

    <p> Submited by : {} </p>
    <ReactAudioPlayer
          src= {props.audioURL}
          autoPlay={false}
          controls
    />
    {props.adminControlls &&
     (<div>
      <Button variant='raised'
        color='secondary'
        onClick={ ()=> {props.onReject(props._id)}}>
        Reject
      </Button>
      <Button
        variant='raised'
        color='primary'
        onClick={ ()=> {props.onApprove(props._id)}}>
      Aprove</Button>
    </div>)
    }
  </div>
)
