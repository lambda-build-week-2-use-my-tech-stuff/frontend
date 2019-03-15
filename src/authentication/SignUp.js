import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSignedIn } from '../actions';
import { Popover } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

class SignUp extends Component {
    state = {
        userInfo: {
          "email": "",
          "password": "",
          "dob": "",
          "location": ""
        }
      }

    changeHandler = e => {
      e.preventDefault();
      this.setState({
        userInfo: {
          ...this.state.userInfo,
          [e.target.name]: e.target.value
        }
      })
    };

    submitDataHandler = (e, userInfo) => {
      e.preventDefault();
      this.props.toggleSignedIn(userInfo);
      alert('Successfully Signed Up! You will now be Logged In');
      this.props.history.push('/');
    }
  render() {
    return (
      <div className='login'>
        <form className='loginForm' onSubmit={e => this.submitDataHandler(e, this.state.userInfo)} >
            <h2 className='logo'>mystuff</h2>
            <TextField className='loginInput' name="email" type='text' placeholder='Username' onChange={this.changeHandler} required />
            <TextField className='loginInput' name="password" type='password' placeholder='Password' onChange={this.changeHandler} required />
            <TextField className='loginInput' type='text' placeholder='Date of Birth' onChange={this.changeHandler} />
            <TextField className='loginInput' type='text' placeholder='Location' onChange={this.changeHandler} />
            <br />
            <button className='loginBtn'  onClick={this.submitDataHandler}>Sign Up</button>
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

export default connect(null, { toggleSignedIn })(SignUp);
