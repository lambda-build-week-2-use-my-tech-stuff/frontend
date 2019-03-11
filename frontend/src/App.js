import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import PostPage from './components/catalog/PostPage';
=======
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import Catalog from './components/Catalog';
>>>>>>> 29dcdf618fdf5fe10aa1aa5bacd261057eaf55e2

class App extends Component {
  render() {
    return (
      <div className="App">
        <PrimarySearchAppBar/>
        <Catalog />
      </div>
    );
  }
}

export default App;
