import React, { Component } from "react";
import "./login.css";
import { connect } from "react-redux";
import { toggleSignedIn } from "../actions";
import TextField from "@material-ui/core/TextField";
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
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.signInOpen}
        onClose={this.props.handleSignInClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title" className="logo">
          <span className="title">mystuff</span>
        </DialogTitle>
        <form onSubmit={e => this.submitDataHandler(e, this.state.userInfo)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              name="email"
              label="Email"
              onChange={this.changeHandler}
              value={this.state.userInfo.email}
              required
              fullWidth
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              margin="normal"
              name="password"
              type="password"
              label="Password"
              value={this.state.userInfo.password}
              onChange={this.changeHandler}
              required
              fullWidth
              variant="outlined"
              autoFocus
              className={classes.textField}
            />

            <DialogContentText>
              Don't Have An Account?
              <Button onClick={this.props.handleSignUpOpen} color="primary">
                Sign Up
              </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              fullWidth
            >
              Sign In
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const styles = theme => ({
  textField: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

const LoginFormStyles = withStyles(styles)(Login);
export default connect(
  null,
  { toggleSignedIn }
)(LoginFormStyles);
