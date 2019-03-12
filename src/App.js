import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PostPage from './components/postpage/PostPage';
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import Catalog from './components/Catalog';
import CatalogGrid from './components/CatalogGrid';
=======
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Navigation from './components/navigation/Navigation';
// import PostPage from './components/catalog/PostPage';
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import Catalog from './components/Catalog';
import ProfilePage from './components/ProfilePage';
>>>>>>> 094012ffcb18ded8a4ebe1458ddfa9eff271d829

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
