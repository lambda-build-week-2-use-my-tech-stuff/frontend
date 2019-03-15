import React, { Component } from 'react';
import './PostForm.css';
import { connect } from 'react-redux';
import { addPost } from '../../actions';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fade } from '@material-ui/core/styles/colorManipulator';

class PostForm extends Component {
  state = {
    post: {
      postTitle: '',
      city: '',
      state: '',
      zip: '',
      price: '',
      description: '',
      category: '',
      image: '',
      createdBy: localStorage.getItem('userID')
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
          type="text"
          margin="normal"
          variant="filled"
          onChange={this.handleInputChange}
          value={this.state.post.postTitle}
          name="postTitle"
          required
          />
          <TextField
          id="filled-city-input"
          label="City"
          className={classes.textField}
          type="text"
          margin="normal"
          variant="filled"
          onChange={this.handleInputChange}
          value={this.state.post.city}
          name="city"
          required
          />
          <TextField
          id="filled-state-input"
          label="State"
          className={classes.textField}
          type="text"
          margin="normal"
          variant="filled"
          onChange={this.handleInputChange}
          value={this.state.post.state}
          name="state"
          required
          />
          <TextField
          id="filled-zip-input"
          label="ZIP"
          className={classes.textField}
          type="number"
          margin="normal"
          variant="filled"
          onChange={this.handleInputChange}
          value={this.state.post.zip}
          name="zip"
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
          id="filled-description-input"
          label="Description"
          className={classes.textField}
          type="text"
          margin="normal"
          variant="filled"
          onChange={this.handleInputChange}
          value={this.state.post.description}
          name="description"
          required
          />
          <TextField
          id="filled-category-input"
          label="Category"
          className={classes.textField}
          type="text"
          margin="normal"
          variant="filled"
          onChange={this.handleInputChange}
          value={this.state.post.category}
          name="category"
          required
          />
          <TextField
          id="filled-image-input"
          label="Image URL"
          className={classes.textField}
          type="text"
          margin="normal"
          variant="filled"
          onChange={this.handleInputChange}
          value={this.state.post.image}
          name="image"
          required
          />
          <Button variant="contained" className={classes.add} type="submit">Add Post</Button>
        </form>
      </div>
    );
  }
}

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
   button: {
    margin: theme.spacing.unit,
  },
  add: {
    margin: theme.spacing.unit,
    backgroundColor: '#24dc8e',
    color: 'white',
    '&:hover': {
      backgroundColor: fade('#24dc8e', .75),
    },
  },
});

const PostFormStyles = withStyles(styles)(PostForm);
export default connect(null, { addPost })(PostFormStyles)
