import React, { Component } from 'react';
import './PostPage.css';
import { connect } from 'react-redux';
import { getPosts } from '../../actions';
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
    const { classes } = this.props;
    return (
      <div className="postpage-container">
        <header className="postpage-header">
          <div>
            <h2>{this.state.post.name}</h2>
            <Fab color="primary" aria-label="Add" size="large" className={classes.fab} component={Link} to="/postform">
              <AddIcon />
            </Fab>
            <Fab color="secondary" aria-label="Edit" className={classes.fab} component={Link} to="/">
              <EditIcon></EditIcon>
            </Fab>
            <Fab aria-label="Delete" className={classes.fab}>
              <DeleteIcon />
            </Fab>
          </div>
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

const PostPageStyles = withStyles(styles)(PostPage);
export default connect(mapStateToProps, { getPosts })(PostPageStyles);
