import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../actions";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class SignUp extends Component {
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
    this.props.signUp(userInfo);
    this.props.handleSignUpClose();
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
        open={this.props.signUpOpen}
        onClose={this.props.handleSignUpClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title" className="logo">
          mystuff
        </DialogTitle>
        <form onSubmit={e => this.submitDataHandler(e, this.state.userInfo)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              onChange={this.changeHandler}
              value={this.state.userInfo.email}
              required
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              autoFocus
              margin="normal"
              fullWidth
              name="password"
              value={this.state.userInfo.password}
              type="password"
              label="Password"
              onChange={this.changeHandler}
              required
              variant="outlined"
              className={classes.textField}
            />

            <DialogContentText>
              Already Have An Account?
              <Button onClick={this.props.handleSignInOpen} color="primary">
                Sign In
              </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              size="large"
              fullWidth
            >
              Sign Up
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

const SignUpFormStyles = withStyles(styles)(SignUp);
export default connect(
  null,
  { signUp }
)(SignUpFormStyles);
