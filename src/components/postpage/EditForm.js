import React, { Component } from "react";
import "./PostForm.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { editPost } from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { fade } from "@material-ui/core/styles/colorManipulator";

class EditForm extends Component {
  state = {
    post: {
      postTitle: this.props.post.postTitle,
      city: this.props.post.city,
      state: this.props.post.state,
      zip: this.props.post.zip,
      price: this.props.post.price,
      description: this.props.post.description,
      category: this.props.post.category,
      postImage: this.props.post.postImage,
      id: this.props.post._id
    }
  };

  editPost = (e, post) => {
    e.preventDefault();
    this.props.editPost(post);
    this.props.history.push(`/postpages/${this.state.post.id}`);
  };

  handleInputChange = e => {
    e.persist();
    this.setState(prevState => ({
      post: {
        ...prevState.post,
        [e.target.name]: e.target.value
      }
    }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="PostForm">
        <Card className={classes.card}>
          <CardHeader title="Edit your Post" />
          <CardContent>
            <form onSubmit={e => this.editPost(e, this.state.post)}>
              <TextField
                id="filled-title-input"
                label="Title"
                className={classes.textField}
                type="text"
                margin="normal"
                fullWidth
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
                fullWidth
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
                fullWidth
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
                fullWidth
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
                fullWidth
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
                fullWidth
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
                fullWidth
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
                fullWidth
                onChange={this.handleInputChange}
                value={this.state.post.postImage}
                name="postImage"
                required
              />
              <Button
                variant="contained"
                type="submit"
                color="inherit"
                className={classes.edit}
                fullWidth
              >
                Edit Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  edit: {
    backgroundColor: "#ffa500",
    color: "white",
    "&:hover": {
      backgroundColor: fade("#ffa500", 0.75)
    }
  },
  card: {
    maxWidth: 500,
    margin: "0 auto"
  }
});

const mapStateToProps = state => ({
  post: state.postsReducer.post
});

const EditFormStyles = withStyles(styles)(EditForm);
export default connect(
  mapStateToProps,
  { editPost }
)(EditFormStyles);
