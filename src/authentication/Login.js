import React, { Component } from 'react'
import './login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            isSignedUp: false,
        }
    }

    changeUserNameHandler = e => this.setState({ username: e.target.value });
    changePasswordHandler = e => this.setState({ password: e.target.value });
    submitDataHandler = e => {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        // localStorage.setItem('username', username);
        // localStorage.setItem('password', password);
        const userInfo = {
          "email": this.state.username,
          "password": this.state.password
        }
        axios.post('https://my-tech-stuff-backend.herokuapp.com/signin', userInfo)
        .then(res => {
          console.log(res);
          localStorage.setItem('jwt', res.data.token);
          window.location.reload()
        })
        .catch(err => {
          console.log(err);
        })
    }
    toggler = e => {
      this.setState({ isSignedUp: !this.state.isSignedUp })
    }
  render() {
    return (
      <>
      {this.state.isSignedUp ? <div className='login'>
        <form className='loginForm' onSubmit={this.submitDataHandler}>
            <h2 className='logo'>mystuff</h2>
            <input className='loginInput' type='text' placeholder='Username' onChange={this.changeUserNameHandler} required />
            <input className='loginInput' type='password' placeholder='Password' onChange={this.changePasswordHandler} required />
            <button className='loginBtn'>Log In</button>
            <br/>
            <p className='p'>Dont Have an Account?</p>
            <p className='signUP' onClick={this.toggler} >Sign Up</p>
        </form>
    </div> : <SignUp toggler={this.toggler} /> }

  </>
    )
  }
}

// <div className='login'>
//         <form className='loginForm' onSubmit={this.submitDataHandler}>
//             <h2 className='logo'>mystuff</h2>
//             <input className='loginInput' type='text' placeholder='Username' onChange={this.changeUserNameHandler} required />
//             <input className='loginInput' type='password' placeholder='Password' onChange={this.changePasswordHandler} required />
//             <button className='loginBtn'>Log In</button>
//             <br/>
//             <p>Dont Have an Account?</p>
//             <Link to='/signup' className='signUP'>Sign Up</Link>
//         </form>
//     </div>
export default withRouter(Login);
