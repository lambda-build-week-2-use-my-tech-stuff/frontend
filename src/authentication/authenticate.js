import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

const authenticate = App =>
  class extends React.Component {
    constructor(){
      super();
      this.state = {
        loggedIn: false
      }
    }

    componentDidMount(){
      if (localStorage.getItem('jwt') ){
        this.setState({
          loggedIn: true
        })
      }
    }

    render(){
      return (
        <div>
          {this.state.loggedIn ? <App /> : <Login />}
        </div>
      )
    }
  };

export default authenticate;
