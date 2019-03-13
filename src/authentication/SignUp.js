import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
    state = {
        username: '',
        password: '',
        dob: '',
        location: ''
      }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });
    submitDataHandler = e => {
        const username = this.state.username;
        const password = this.state.password;
        const userInfo = {
          "email": this.state.username,
          "password": this.state.password
        }
        axios.post('https://my-tech-stuff-backend.herokuapp.com/signup', userInfo)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }
  render() {
    return (
      <div className='login'>
        <form className='loginForm'>
            <h2 className='logo'>mystuff</h2>
            <input className='loginInput' type='text' placeholder='Username' onChange={this.changeHandler} required />
            <input className='loginInput' type='password' placeholder='Password' onChange={this.changeHandler} required />
            <input className='loginInput' type='text' placeholder='Date of Birth' onChange={this.changeHandler} required />
            <input className='loginInput' type='text' placeholder='Location' onChange={this.changeHandler} required />
            <button className='loginBtn'  onClick={this.submitDataHandler}>Sign Up</button>
            <br/>
            <p>Already Have an Account?</p>
            <p className='signUP' onClick={this.props.toggler}>Log In</p>
        </form>
      </div>
    )
  }
}
