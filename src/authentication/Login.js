import React, { Component } from "react";
import "./login.css";
import { connect } from "react-redux";
import { toggleSignedIn } from "../actions";
import TextField from "@material-ui/core/TextField";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Login extends Component {
  state = {
    userInfo: {
      email: "",
      password: ""
    }
  };

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  submitDataHandler = (e, userInfo) => {
    e.preventDefault();
    this.props.toggleSignedIn(userInfo);
    this.props.handleSignInClose();
    this.setState({
      userInfo: {
        email: "",
        password: ""
      }
    });
  };

  render() {
    return (
      <Dialog
        open={this.props.signInOpen}
        onClose={this.props.handleSignInClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className="logo">mystuff</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <form onSubmit={e => this.submitDataHandler(e, this.state.userInfo)}>
          <DialogContent>
            <TextField
              autoFocus
              className="loginInput"
              name="email"
              label="Email"
              onChange={this.changeHandler}
              value={this.state.userInfo.email}
              required
              fullWidth
            />
            <TextField
              className="loginInput"
              name="password"
              type="password"
              label="Password"
              value={this.state.userInfo.password}
              onChange={this.changeHandler}
              required
              fullWidth
              autoFocus
            />

            <DialogContentText>
              Don't Have An Account?
              <Button onClick={this.props.handleSignUpOpen} color="primary">
                Sign Up
              </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Sign In
            </Button>
            <Button onClick={this.props.handleSignInClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  edit: {
    margin: theme.spacing.unit,
    backgroundColor: "#ffa500",
    color: "white",
    "&:hover": {
      backgroundColor: fade("#ffa500", 0.75)
    }
  }
});

const LoginFormStyles = withStyles(styles)(Login);
export default connect(
  null,
  { toggleSignedIn }
)(LoginFormStyles);
