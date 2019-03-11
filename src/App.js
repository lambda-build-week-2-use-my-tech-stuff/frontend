import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PostPage from './components/postpage/PostPage';
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import Catalog from './components/Catalog';
import CatalogGrid from './components/CatalogGrid';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <PrimarySearchAppBar/>
          <Route exact path="/" component={CatalogGrid} />
          <Route path="/postpage/:id"/>
          <Route path="/profile-page/:id" />
        </div>
      </Router>
    );
  }
}

export default App;
