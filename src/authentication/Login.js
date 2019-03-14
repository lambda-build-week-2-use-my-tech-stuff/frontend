import React, { Component } from 'react'
import './login.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { toggleSignedIn } from '../actions';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    changeUserNameHandler = e => this.setState({ username: e.target.value });
    changePasswordHandler = e => this.setState({ password: e.target.value });
    submitDataHandler = e => {
        e.preventDefault();
        const userInfo = {
          "email": this.state.username,
          "password": this.state.password
        }
        axios.post('https://my-tech-stuff-backend.herokuapp.com/signin', userInfo)
        .then(res => {
          console.log(res);
          localStorage.setItem('jwt', res.data.token);
          localStorage.setItem('userID', res.data);
          this.props.toggleSignedIn();
          this.props.history.push('/');
        })
        .catch(err => {
          console.log(err);
        })
    }

  render() {
    return (
      <>
      <div className='login'>
        <form className='loginForm' onSubmit={this.submitDataHandler}>
            <h2 className='logo'>mystuff</h2>
            <input className='loginInput' type='text' placeholder='Username' onChange={this.changeUserNameHandler} required />
            <input className='loginInput' type='password' placeholder='Password' onChange={this.changePasswordHandler} required />
            <button className='loginBtn'>Log In</button>
            <br/>
            <p className='p'>Dont Have an Account?</p>
            <Link to="/signup">
              <p className='signUP'>Sign Up</p>
            </Link>
        </form>
        </div>

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

export default connect(null, { toggleSignedIn })(Login);
