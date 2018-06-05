import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Authenticate from './Authenticate'
import base64 from 'base-64';
import SubmissionView from './SubmissionView'
import styled from 'styled-components';

const Container = styled.div`
  width:100%;
  height:100%;
`
class Admin extends Component {
  state={
    auth: null,
    submissions: null
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  getHeaders(){
    let headers = new Headers()
    headers.append('Authorization', this.state.auth)
    return headers
  }
  getSubmissions(){
    const headers = this.getHeaders()
    fetch('/private/entry', {
      headers: headers
    }).then(r=>r.json()).then((submissions)=>{
      this.setState({
        submissions
      })
    })
  }

  updateSubmission(submission){
    const newList = this.state.submissions.map( (a) => (a._id===submission._id ? submission : a) )
    console.log(newList)
    this.setState({
      submissions : newList
    })
  }

  rejectSubmission(id){
    const headers = this.getHeaders()
    fetch(`/private/entry/${id}/reject`,
      {
        method : "POST",
        headers: headers
      }
    ).then(r=>r.json()).then((savedSubmission)=>{
      this.updateSubmission(savedSubmission)
    })
  }
  acceptSubmission(id){
    const headers = this.getHeaders()
    fetch(`/private/entry/${id}/approve`,
      {
        method : "POST",
        headers: headers
      }
    ).then(r=>r.json()).then((savedSubmission)=>{
      console.log(savedSubmission)
      this.updateSubmission(savedSubmission)
    })
  }

  render() {
    return (
      <Container>
        { this.state.submissions ?
                 this.state.submissions.map((sub)=>(
                   <SubmissionView
                     {...sub}
                     key={sub._id}
                     onReject={this.rejectSubmission.bind(this)}
                     onApprove={this.acceptSubmission.bind(this)}
                     adminControlls
                   />
                 ))
         :
            (
          <Authenticate
            onAttemptLogin={ (username,password)=>{
              const auth = 'Basic ' + base64.encode(username + ":" + password);
              this.setState({auth},
                this.getSubmissions.bind(this)
              )
            }}
          />
            )
        }
      </Container>
    );
  }
}

export default Admin;
