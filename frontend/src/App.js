import React, { Component } from 'react';
import './App.css';
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import Catalog from './components/Catalog';

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
