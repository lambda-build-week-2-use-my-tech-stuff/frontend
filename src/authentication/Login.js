import React, { Component } from 'react'
import './login.css';


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        }
    }

    changeUserNameHandler = e => this.setState({ username: e.target.value });
    changePasswordHandler = e => this.setState({ password: e.target.value });
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
            <input className='loginInput' type='text' placeholder='Username' onChange={this.changeUserNameHandler} required />
            <input className='loginInput' type='password' placeholder='Password' onChange={this.changePasswordHandler} required />
            <button className='loginBtn' onClick={this.submitDataHandler}>Log In</button>
            <br/>
            <a href='#' className='signUP'>Sign Up</a>
        </form>
    </div>
    )
  }
}
