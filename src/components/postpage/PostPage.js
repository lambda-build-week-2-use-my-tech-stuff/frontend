import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions';
import './PostPage.css';

class PostPage extends Component {
  state = {
    post: {
      name: '',
      price: '',
      location: '',
      description: '',
      image: ''
    }
  }

  componentDidMount() {
    this.props.getPosts()
    const thisPost = this.props.posts.find(post => post._id === this.props.match.params.id)
    this.setState({ post: {
      name: 11,
      price: 1121,
      description: 11
    } })
    console.log(this.props)
  }

  render() {
    return (
      <div className="postpage-container">
        <header className="postpage-header">
          <h2>{this.state.post.name}</h2>
          <h3>${this.state.post.price}</h3>
          <h4>Placeholder Location, Location, 11292</h4>
        </header>
        <article className="postpage-content">
          <img src={this.state.post.name} alt={this.state.post.name} />
          <p>{this.state.post.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </article>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps, { getPosts })(PostPage)
