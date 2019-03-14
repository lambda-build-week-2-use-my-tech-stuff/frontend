import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Popover } from '@material-ui/core';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            dob: '',
            location: ''
        }
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });
    submitDataHandler = () => {
      alert('Successfully Signed Up! You may now Log In')
  }
  render() {
    return (
      <div className='login'>
        <form className='loginForm' onSubmit={this.submitDataHandler} >
            <h2 className='logo'>mystuff</h2>
            <input className='loginInput' type='text' placeholder='Username' onChange={this.changeHandler} required />
            <input className='loginInput' type='password' placeholder='Password' onChange={this.changeHandler} required />
            <input className='loginInput' type='text' placeholder='Date of Birth' onChange={this.changeHandler} required />
            <input className='loginInput' type='text' placeholder='Location' onChange={this.changeHandler} required />
            <button className='loginBtn'>Sign Up</button>
            <br/>
            <p className='p'>Already Have an Account?</p>
            <p className='signUP' onClick={this.props.toggler}>Log In</p>
        </form>
      </div>
    )
  }
}
