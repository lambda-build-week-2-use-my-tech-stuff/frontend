import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import PostPage from './components/catalog/PostPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" />
          <Route path={`/catalog/postpage:id`} />
          <Route path={`/profilepage/:id`} />
        </div>
      </Router>
    );
  }
}

export default App;
