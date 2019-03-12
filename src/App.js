import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Navigation from './components/navigation/Navigation';
// import PostPage from './components/catalog/PostPage';
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import Catalog from './components/Catalog';
import ProfilePage from './components/ProfilePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PrimarySearchAppBar/>
        <Catalog />
        <ProfilePage />
      </div>
    );
  }
}

export default App;
