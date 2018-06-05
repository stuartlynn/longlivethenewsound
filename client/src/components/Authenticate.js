import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Authenticate extends React.Component{
  state={
    username:'',
    password:''
  }
  render(props){
    return (
      <div>
        <TextField
          id= 'username'
          label="Username"
          required
          value = {this.state.username}
          type="username"
          autoComplete='username'
          onChange= { (e) => {this.setState({username: e.target.value})}}
        />

        <TextField
          id= 'password'
          label="password"
          required
          type="password"
          autoComplete='current-password'
          value = {this.state.password}
          onChange= { (e) => {this.setState({password: e.target.value})}}
        />

      <Button
        variant="raised"
        color="primary"
        onClick={()=>{this.props.onAttemptLogin(this.state.username,this.state.password)}}> Submit </Button>
      </div>
    )
  }
}

export default Authenticate
