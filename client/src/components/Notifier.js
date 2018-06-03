import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

let openSnackbarFn;

class Notifier extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };
  state={
    open : false,
    message: ''
  }

  componentDidMount() {
    openSnackbarFn = this.openSnackbar.bind(this)
  }

  openSnackbar (message) {
    this.setState({
      open: true,
      message,
    });
  };

  constructor(props) {
    super(props);
  }

  handleSnackbarClose(){
    this.setState({
       open:false,
       message:''
    })
  }

  render() {
    console.log(this.state.message)
    return (
      <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          message={<span id="message-id">{this.state.message}</span>}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose.bind(this)}
          open={this.state.open}
          SnackbarContentProps={{
            'aria-describedby': 'snackbar-message-id',
          }} />
    );
  }
}

export default Notifier;

export function openSnackbar( message ) {
  openSnackbarFn( message );
}
