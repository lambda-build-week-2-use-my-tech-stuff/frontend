import React, { Component } from 'react';
import './PostForm.css';
import { connect } from 'react-redux';
import { addPost } from '../../actions';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class PostForm extends Component {
  state = {
    post: {
      postTitle: '',
      age: '',
      height: ''
    }
  }

  addPost = (e, post) => {
    e.preventDefault();
    this.props.addPost(post)
    this.props.history.push("/")
  }

  handleInputChange = e => {
    e.persist();
    this.setState(prevState => ({
      post: {
        ...prevState.post,
        [e.target.name]: e.target.value
      }
    }));
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="PostForm">
        <form onSubmit={e => this.addPost(e, this.state.post)}>
          <TextField
          id="filled-title-input"
          label="Title"
          className={classes.textField}
          type="title"
          margin="normal"
          variant="filled"
          onChange={this.handleInputChange}
          value={this.state.post.postTitle}
          name="postTitle"
          required
          />
          <TextField
          id="filled-price-input"
          label="Price"
          className={classes.textField}
          type="number"
          margin="normal"
          variant="filled"
          onChange={this.handleInputChange}
          value={this.state.post.price}
          name="price"
          required
          />
          <TextField
          id="filled-image-input"
          label="Image URL"
          className={classes.textField}
          type="image"
          margin="normal"
          variant="filled"
          type="text"
          onChange={this.handleInputChange}
          placeholder="Image"
          value={this.state.post.image}
          name="image"
          required
          />
          <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}

const PostFormStyles = withStyles(styles)(PostForm);

export default connect(null, { addPost })(PostFormStyles)
