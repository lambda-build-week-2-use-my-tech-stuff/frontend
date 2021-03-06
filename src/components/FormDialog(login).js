import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkSignIn } from "../actions";
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import Button from "@material-ui/core/Button";

class FormDialog extends React.Component {
  state = {
    signInOpen: false,
    signUpOpen: false
  };

  componentDidMount() {
    this.props.checkSignIn();
    this.checkPathName();
  }

  checkPathName = () => {
    if (
      this.props.location.pathname === "/login" ||
      this.props.location.pathname === "/signin"
    ) {
      this.handleSignInOpen();
    } else if (
      this.props.location.pathname === "/signup" ||
      this.props.location.pathname === "/register"
    ) {
      this.handleSignUpOpen();
    }
  };

  handleSignInOpen = () => {
    this.setState({ signInOpen: true, signUpOpen: false });
  };

  handleSignInClose = () => {
    this.setState({ signInOpen: false });
  };

  handleSignUpOpen = () => {
    this.setState({ signUpOpen: true, signInOpen: false });
  };

  handleSignUpClose = () => {
    this.setState({ signUpOpen: false });
  };

  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userID");
    this.props.checkSignIn();
    this.props.history.push("/");
  };

  signIn = () => {
    this.props.history.push("/signin");
  };

  signUp = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <div className="signUpBtn">
        {this.props.signedIn ? (
          <Button variant="outlined" color="inherit" onClick={this.logOut}>
            Log Out
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              color="inherit"
              onClick={this.handleSignInOpen}
            >
              Log In
            </Button>
            {/* <Button variant="outlined" color="inherit" onClick={this.signUp}>
            Sign Up
          </Button> */}
          </>
        )}
        <Login
          handleSignInClose={this.handleSignInClose}
          handleSignInOpen={this.handleSignInOpen}
          signInOpen={this.state.signInOpen}
          handleSignUpOpen={this.handleSignUpOpen}
          history={this.props.history}
        />
        <SignUp
          handleSignUpClose={this.handleSignUpClose}
          handleSignUpOpen={this.handleSignUpOpen}
          signUpOpen={this.state.signUpOpen}
          handleSignInOpen={this.handleSignInOpen}
          history={this.props.history}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signedIn: state.signInReducer.signedIn
});

const FormDialogRouter = withRouter(FormDialog);
export default connect(
  mapStateToProps,
  { checkSignIn }
)(FormDialogRouter);
