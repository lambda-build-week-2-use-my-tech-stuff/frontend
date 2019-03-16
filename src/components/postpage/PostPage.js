import React, { Component } from 'react';
import './PostPage.css';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { getPost, deletePost } from '../../actions';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { fade } from '@material-ui/core/styles/colorManipulator';

class PostPage extends Component {
  state = {
    post: {
      name: '',
      price: '',
      category: '',
      location: '',
      description: '',
      postImage: '',
      createdBy: ''
    }
  }

  componentDidMount() {
    if (this.props.post._id !== this.props.match.params.id) {
      this.props.getPost(this.props.match.params.id);
    }
    else {
      this.setState({ post: {
        name: this.props.post.postTitle,
        price: this.props.post.price,
        category: this.props.post.category,
        description: this.props.post.description,
        location: `${this.props.post.city}, ${this.props.post.state} ${this.props.post.zip}`,
        postImage: this.props.post.postImage,
        createdBy: this.props.post.createdBy
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
        price: post.price,
        category: post.category,
        description: post.description,
        postImage: post.postImage,
        location: `${post.city}, ${post.state} ${post.zip}`,
        createdBy: post.createdBy
      } })
    }
  }

  render() {
    const { classes } = this.props;

    if (this.props.fetchingPost) {
      return (
        <div className="loading">
          <Loader type="Oval" color="#00bfff" height="150" width="100" />
        </div>
      )
    }

    return (
      <div className="postpage-container">
        <header className="postpage-header">
          <div className="title-container">
            {this.state.post.createdBy === localStorage.getItem('userID') && <>
              <Fab aria-label="Edit" className={classes.edit} component={Link} to='/editform'>
                <EditIcon></EditIcon>
              </Fab>
              <Fab aria-label="Delete" className={classes.remove} onClick={() => this.deletePost(this.props.match.params.id)}>
                <DeleteIcon />
              </Fab>
            </>}
            <h2>{this.state.post.name}</h2>
          </div>
          <h3>${this.state.post.price}</h3>
          <h3>{this.state.post.category}</h3>
          <h4>{this.state.post.location}</h4>
        </header>
        <article className="postpage-content">
          <img src={this.state.post.postImage} alt={this.state.post.name} />
          <p>{this.state.post.description}</p>
        </article>
      </div>
    )
  }
}

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  edit: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffa500',
    color: 'white',
    '&:hover': {
      backgroundColor: fade('#ffa500', .75),
    },
  },
  remove: {
    margin: theme.spacing.unit,
    backgroundColor: '#dc3545',
    color: 'white',
    '&:hover': {
      backgroundColor: fade('#dc3545', .75),
    },
  }
});

const mapStateToProps = state => ({
  post: state.post,
  fetchingPost: state.fetchingPost,
  error: state.error
})

const PostPageStyles = withStyles(styles)(PostPage);
export default connect(mapStateToProps, { getPost, deletePost })(PostPageStyles);
