import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSignedIn } from '../actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class FormDialog extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.props.toggleSignedIn();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  logOut = () => {
    localStorage.removeItem('jwt');
    this.props.toggleSignedIn();
  }

  signIn = () => {
    this.props.history.push("/signin")
  }

  signUp = () => {
    this.props.history.push("/signup")
  }

  render() {
    return (
      <div className='signUpBtn'>
        {this.props.signedIn ? <Button variant="outlined" color="inherit" onClick={this.logOut}>
          Sign Out
        </Button> :
        <>
          <Button variant="outlined" color="inherit" onClick={this.signIn}>
            Log In
          </Button>
          <Button variant="outlined" color="inherit" onClick={this.signUp}>
            Sign Up
          </Button>
        </> }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="Password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
          <Button onClick={this.handleClose} color="primary">
              Sign Up
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Log In
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signedIn: state.signedIn
})

const FormDialogRouter = withRouter(FormDialog);
export default connect(mapStateToProps, { toggleSignedIn })(FormDialogRouter);
