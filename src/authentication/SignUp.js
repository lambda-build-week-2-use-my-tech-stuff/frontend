import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../actions';
import { Popover } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

class SignUp extends Component {
    state = {
        userInfo: {
          "email": "",
          "password": ""
        }
      }

    changeHandler = e => {
      e.preventDefault();
      console.log(this.state)
      this.setState({
        userInfo: {
          ...this.state.userInfo,
          [e.target.name]: e.target.value
        }
      })
    };

    submitDataHandler = (e, userInfo) => {
      e.preventDefault();
      this.props.signUp(userInfo);
      alert('Successfully Signed Up! You will now be Logged In');
      this.props.history.push('/');
    }
  render() {
    return (
      <div className='login'>
        <form className='loginForm' onSubmit={e => this.submitDataHandler(e, this.state.userInfo)} >
            <h2 className='logo'>mystuff</h2>
            <TextField className='loginInput' name="email" type='text' placeholder='Email' onChange={this.changeHandler} value={this.state.userInfo.email} required />
            <TextField className='loginInput' name="password" value={this.state.userInfo.password} type='password' placeholder='Password' onChange={this.changeHandler} required />
            <br />
            <button className='loginBtn'>Sign Up</button>
            <br/>
            <p className='p'>Already Have an Account?</p>
            <br />
            <Link to="/signin">
              <p className='signUP'>Log In</p>
            </Link>
        </form>
      </div>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
   button: {
    margin: theme.spacing.unit,
  },
  edit: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffa500',
    color: 'white',
    '&:hover': {
      backgroundColor: fade('#ffa500', .75),
    },
  },
});

const SignUpFormStyles = withStyles(styles)(SignUp);
export default connect(null, { signUp })(SignUpFormStyles);
