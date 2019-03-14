import React, { Component } from 'react';
import './PostPage.css';
import { connect } from 'react-redux';
import { getPost, deletePost } from '../../actions';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class PostPage extends Component {
  state = {
    post: {
      name: '',
      price: '',
      category: '',
      location: '',
      description: '',
      image: ''
    }
  }

  componentDidMount() {
    if (this.props.post._id !== this.props.match.params.id) {
      this.props.getPost(this.props.match.params.id);
    }
    else {
      this.setState({ post: {
        name: this.props.post.postTitle,
        price: 1121,
        category: this.props.post.category,
        description: this.props.post.description,
        location: `${this.props.post.city}, ${this.props.post.state} ${this.props.post.zip}`
      }})
    }
  }

  deletePost = id => {
    this.props.deletePost(id);
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.post !== this.props.post) {
      const post = this.props.post;
      this.setState({ post: {
        name: post.postTitle,
        price: 1121,
        category: post.category,
        description: post.description,
        location: `${post.city}, ${post.state} ${post.zip}`
      } })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="postpage-container">
        <header className="postpage-header">
          <div className="title-container">
            <h2>{this.state.post.name}</h2>
            <Fab color="secondary" aria-label="Add" size="large" className={classes.fab} component={Link} to="/postform">
              <AddIcon />
            </Fab>
            <Fab aria-label="Edit" color='primary' className={classes.fab} component={Link} to='/editform'>
              <EditIcon></EditIcon>
            </Fab>
            <Fab aria-label="Delete" color="inherit" className={classes.fab} onClick={() => this.deletePost(this.props.match.params.id)}>
              <DeleteIcon />
            </Fab>
          </div>
          <h3>${this.state.post.price}</h3>
          <h3>{this.state.post.category}</h3>
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
  post: state.post,
  fetchingPost: state.fetchingPost,
  error: state.error
})

const PostPageStyles = withStyles(styles)(PostPage);
export default connect(mapStateToProps, { getPost, deletePost })(PostPageStyles);
