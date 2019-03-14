import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSignedIn } from '../actions';
import { Popover } from '@material-ui/core';

class SignUp extends Component {
    state = {
        username: "",
        password: "",
        dob: "",
        location: ""
      }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    submitDataHandler = e => {
        e.preventDefault();
        const userInfo = {
          "email": this.state.username,
          "password": this.state.password
        }
        axios.post('https://my-tech-stuff-backend.herokuapp.com/signup', userInfo)
        .then(res => {
          console.log(res)
          localStorage.setItem('jwt', res.data.token);
          localStorage.setItem('userID', res.data.userId);
          this.props.toggleSignedIn();
          alert('Successfully Signed Up! You will now be Logged In');
          this.props.history.push('/');
        })
        .catch(err => {
          console.log(err);
        })
    }
  render() {
    return (
      <div className='login'>
        <form className='loginForm' onSubmit={this.submitDataHandler} >
            <h2 className='logo'>mystuff</h2>
            <input className='loginInput' name="username" type='text' placeholder='Username' onChange={this.changeHandler} required />
            <input className='loginInput' name="password" type='password' placeholder='Password' onChange={this.changeHandler} required />
            <input className='loginInput' type='text' placeholder='Date of Birth' onChange={this.changeHandler} />
            <input className='loginInput' type='text' placeholder='Location' onChange={this.changeHandler} />
            <button className='loginBtn'  onClick={this.submitDataHandler}>Sign Up</button>
            <br/>
            <p className='p'>Already Have an Account?</p>
            <Link to="/signin">
              <p className='signUP'>Log In</p>
            </Link>
        </form>
      </div>
    )
  }
}

const SignUpRouter = withRouter(SignUp);
export default connect(null, { toggleSignedIn })(SignUpRouter);
