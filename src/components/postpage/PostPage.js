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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posts !== this.props.posts) {
      const thisPost = this.props.posts.find(post => post._id === this.props.match.params.id)
      this.setState({ post: {
        name: thisPost.postTitle,
        price: 1121,
        description: thisPost.description,
        location: `${thisPost.city}, ${thisPost.state} ${thisPost.zip}`
      } })
      console.log(thisPost)
    }
  }

  render() {
    return (
      <div className="postpage-container">
        <header className="postpage-header">
          <h2>{this.state.post.name}</h2>
          <h3>${this.state.post.price}</h3>
          <h4>{this.state.post.location}</h4>
        </header>
        <article className="postpage-content">
          <img src={this.state.post.image} alt={this.state.post.name} />
          <p>{this.state.post.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </article>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  fetchingPosts: state.fetchingPosts,
  error: state.error
})

export default connect(mapStateToProps, { getPosts })(PostPage)
