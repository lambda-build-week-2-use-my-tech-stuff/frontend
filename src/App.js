import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PostPage from './components/postpage/PostPage';
import CatalogGrid from './components/CatalogGrid';
import ProfilePage from './components/ProfilePage';
import PostForm from './components/postpage/PostForm';
import EditForm from './components/postpage/EditForm';
import authenticate from './authentication/authenticate';
import SignUp from './authentication/SignUp';
import Login from './authentication/Login';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';   


class App extends Component {
  render() {
    return (
      // <Router>
        <div className="App">
          <PrimarySearchAppBar />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path='/login' render={props => <Login {...props} />} />
          <Route exact path="/" component={CatalogGrid} />
          <Route path="/postpages/:id" component={PostPage} />
          <Route path="/profile-page/:id" component={ProfilePage} />
          <Route path="/postform" component={PostForm} />
          <Route path="/editform" component={EditForm} />
        </div>
      // </Router>
    );
  }
}

export default authenticate(App);
