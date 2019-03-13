import React, { Component } from 'react'
import { Link } from 'react-router-dom';

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
        const username = this.state.username;
        const password = this.state.password;
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
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
            <button className='loginBtn' onClick={this.submitDataHandler}>Sign Up</button>
            <br/>
            <p>Already Have an Account?</p>
            <Link to='/login' className='signUP'>Log In</Link>
        </form>
      </div>
    )
  }
}
