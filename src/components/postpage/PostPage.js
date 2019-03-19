import React, { Component } from 'react';
import './PostPage.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { getPost, deletePost, handleError } from '../../actions';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PostPage extends Component {
  state = {
    open: false
  }

  componentDidMount() {
    if (this.props.post._id !== this.props.match.params.id) {
      this.props.getPost(this.props.match.params.id);
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

  handleClickOpen = () => {
    this.setState({ open: true})
  }

  handleClose = () => {
    this.setState({ open: false})
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
                <Fab aria-label="Delete" className={classes.remove} onClick={this.handleClickOpen}>
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
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this post?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Once you delete a post, it is gone forever.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                No, keep this post
              </Button>
              <Button onClick={() => this.deletePost(this.props.match.params.id)} color="primary" autoFocus>
                Delete this post
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
      return (
        <div>
          <CircularProgress className={classes.progress} color="primary" disableShrink />
        </div>
      )
  }
}

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit * 2,
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
