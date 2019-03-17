import React, { Component } from 'react';
import './PostPage.css';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { getPost, deletePost, handleError } from '../../actions';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { fade } from '@material-ui/core/styles/colorManipulator';

class PostPage extends Component {

  componentDidMount() {
    if (this.props.post._id !== this.props.match.params.id) {
      this.props.getPost(this.props.match.params.id);
    }
    else if (this.props.error && this.props.post._id === this.props.match.params.id) {
      this.props.handleError()
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.fetchingPost && nextProps.fetchingPost && this.props.post._id !== this.props.match.params.id) {
      return false
    }
    if (!this.props.fetchingPost && nextProps.fetchingPost && Object.keys(this.props.post).length !== 0) {
      return true
    }
    else if (!this.props.fetchingPost && nextProps.fetchingPost) {
      return false
    }
      return true
  }

  deletePost = id => {
    this.props.deletePost(id);
    this.props.history.push('/')
  }

  render() {
    const { classes, fetchingPost, post, error } = this.props;
    const { category, city, createdBy, description, postImage, postTitle, price, state, zip, _id } = this.props.post

    if (error) {
      return (
        <div className="error">
          <h3>{error}</h3>
        </div>
      )
    }

     if (Object.keys(post).length !== 0 && !fetchingPost && _id === this.props.match.params.id) {
      return (
        <div className="postpage-container">
          <header className="postpage-header">
            <div className="title-container">
              {createdBy === localStorage.getItem('userID') && <>
                <Fab aria-label="Edit" className={classes.edit} component={Link} to='/editform'>
                  <EditIcon></EditIcon>
                </Fab>
                <Fab aria-label="Delete" className={classes.remove} onClick={() => this.deletePost(this.props.match.params.id)}>
                  <DeleteIcon />
                </Fab>
              </>}
              <h2>{postTitle}</h2>
            </div>
            <h3>${price}</h3>
            <h3>{category}</h3>
            <h4>{`${city}, ${state} ${zip}`}</h4>
          </header>
          <article className="postpage-content">
            <img src={postImage} alt={postTitle} />
            <p>{description}</p>
          </article>
        </div>
      )
    }
      return (
        <div className="loading">
          <Loader type="Oval" color="#00bfff" height="150" width="100" />
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
export default connect(mapStateToProps, { getPost, deletePost, handleError })(PostPageStyles);
