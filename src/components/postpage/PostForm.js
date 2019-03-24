import React, { Component } from "react";
import "./PostForm.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { addPost } from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { fade } from "@material-ui/core/styles/colorManipulator";

class PostForm extends Component {
  state = {
    post: {
      postTitle: "",
      city: "",
      state: "",
      zip: "",
      price: "",
      description: "",
      category: "",
      postImage: "",
      createdBy: localStorage.getItem("userID")
    }
  };

  addPost = (e, post) => {
    e.preventDefault();
    this.props.addPost(post);
    this.props.history.push("/");
  };

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
        <Card className={classes.card}>
          <CardHeader title="Add a new Post" />
          <CardContent>
            <form onSubmit={e => this.addPost(e, this.state.post)}>
              <TextField
                id="filled-title-input"
                label="Title"
                className={classes.textField}
                type="text"
                margin="normal"
                onChange={this.handleInputChange}
                value={this.state.post.postTitle}
                name="postTitle"
                required
                fullWidth
              />
              <TextField
                id="filled-city-input"
                label="City"
                className={classes.textField}
                type="text"
                margin="normal"
                onChange={this.handleInputChange}
                value={this.state.post.city}
                name="city"
                required
                fullWidth
              />
              <TextField
                id="filled-state-input"
                label="State"
                className={classes.textField}
                type="text"
                margin="normal"
                onChange={this.handleInputChange}
                value={this.state.post.state}
                name="state"
                required
                fullWidth
              />
              <TextField
                id="filled-zip-input"
                label="ZIP"
                className={classes.textField}
                type="number"
                margin="normal"
                onChange={this.handleInputChange}
                value={this.state.post.zip}
                name="zip"
                required
                fullWidth
              />
              <TextField
                id="filled-price-input"
                label="Price"
                className={classes.textField}
                type="number"
                margin="normal"
                onChange={this.handleInputChange}
                value={this.state.post.price}
                name="price"
                required
                fullWidth
              />
              <TextField
                id="filled-description-input"
                label="Description"
                className={classes.textField}
                type="text"
                margin="normal"
                onChange={this.handleInputChange}
                value={this.state.post.description}
                name="description"
                required
                fullWidth
              />
              <TextField
                id="filled-category-input"
                label="Category"
                className={classes.textField}
                type="text"
                margin="normal"
                onChange={this.handleInputChange}
                value={this.state.post.category}
                name="category"
                required
                fullWidth
              />
              <TextField
                id="filled-image-input"
                label="Image URL"
                className={classes.textField}
                type="text"
                margin="normal"
                onChange={this.handleInputChange}
                value={this.state.post.postImage}
                name="postImage"
                required
                fullWidth
              />
              <Button
                variant="contained"
                fullWidth
                className={classes.add}
                type="submit"
              >
                Add Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  add: {
    backgroundColor: "#0087ea",
    color: "white",
    "&:hover": {
      backgroundColor: fade("#0087ea", 0.75)
    }
  },
  card: {
    maxWidth: 500,
    margin: "0 auto"
  }
});

const PostFormStyles = withStyles(styles)(PostForm);
export default connect(
  null,
  { addPost }
)(PostFormStyles);
