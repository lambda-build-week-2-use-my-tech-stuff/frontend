import React from 'react';
import Login from './Login';

const authenticate = App =>
  class extends React.Component {
    constructor(){
      super();
      this.state = {
        loggedIn: false
      }
    }

    componentDidMount(){
      if ( (localStorage.getItem('username')) && (localStorage.getItem('password')) ){
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