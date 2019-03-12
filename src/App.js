import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PostPage from './components/postpage/PostPage';
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import Catalog from './components/Catalog';
import CatalogGrid from './components/CatalogGrid';
import ProfilePage from './components/ProfilePage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <PrimarySearchAppBar/>
          <Route exact path="/" component={CatalogGrid} />
          <Route path="/postpages/:id" component={PostPage}/>
          <Route path="/profile-page/:id" component={ProfilePage}/>
        </div>
      </Router>
    );
  }
}

export default App;
