import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PostPage from './components/postpage/PostPage';
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import CatalogGrid from './components/CatalogGrid';
import ProfilePage from './components/ProfilePage';
import PostForm from './components/postpage/PostForm';
import EditForm from './components/postpage/EditForm';
import authenticate from './authentication/authenticate';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <PrimarySearchAppBar/>
          <Route exact path="/" component={CatalogGrid} />
          <Route path="/postpages/:id" component={PostPage} />
          <Route path="/profile-page/:id" component={ProfilePage} />
          <Route path="/postform" component={PostForm} />
          <Route path="/:id/editform" component={EditForm} />
        </div>
      </Router>
    );
  }
}

export default authenticate(App);
