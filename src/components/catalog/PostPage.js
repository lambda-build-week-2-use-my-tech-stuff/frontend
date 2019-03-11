import React, { Component } from 'react';
import './PostPage.css';

class PostPage extends Component {
  render() {
    return (
      <div className="postpage-container">
        <header className="postpage-header">
          <h2>Name of Item</h2>
          <h3>Price of Item</h3>
          <h4>Placeholder Location, Location, 11292</h4>
        </header>
        <article className="postpage-content">
          <img />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </article>
      </div>
    )
  }
}

export default PostPage;
