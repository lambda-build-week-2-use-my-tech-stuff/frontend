import React, { Component } from "react";
import "./PostPage.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { getPost, deletePost, handleError } from "../../actions";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

class PostPage extends Component {
  state = {
    open: false
  };

  componentDidMount() {
    if (this.props.post._id !== this.props.match.params.id) {
      this.props.getPost(this.props.match.params.id);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      !this.props.fetchingPost &&
      nextProps.fetchingPost &&
      this.props.post._id !== this.props.match.params.id
    ) {
      return false;
    }
    if (
      !this.props.fetchingPost &&
      nextProps.fetchingPost &&
      Object.keys(this.props.post).length !== 0
    ) {
      return true;
    } else if (!this.props.fetchingPost && nextProps.fetchingPost) {
      return false;
    }
    return true;
  }

  deletePost = id => {
    this.props.deletePost(id);
    this.props.history.push("/");
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, fetchingPost, post, error } = this.props;
    const {
      category,
      city,
      createdBy,
      description,
      postImage,
      postTitle,
      price,
      state,
      zip,
      _id
    } = this.props.post;

    if (error) {
      return (
        <div className="error">
          <h3>{error}</h3>
        </div>
      );
    }

    if (
      Object.keys(post).length !== 0 &&
      !fetchingPost &&
      _id === this.props.match.params.id
    ) {
      return (
        <div className="postpage-container">
          <Card className={classes.card}>
            <CardHeader
              action={
                createdBy === localStorage.getItem("userID") && (
                  <>
                    <Fab
                      aria-label="Edit"
                      className={classes.edit}
                      component={Link}
                      to="/editform"
                    >
                      <EditIcon />
                    </Fab>
                    <Fab
                      aria-label="Delete"
                      className={classes.remove}
                      onClick={this.handleClickOpen}
                    >
                      <DeleteIcon />
                    </Fab>
                  </>
                )
              }
              title={postTitle}
              subheader={`${city}, ${state} ${zip}`}
            />
            <CardMedia
              className={classes.media}
              component="img"
              image={postImage}
              title={postTitle}
            />
            <CardContent>
              <Typography component="h3">${price} a week</Typography>
              <Typography component="h4">{category}</Typography>
              <Typography component="p">{description}</Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
            keepMounted
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this post?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Once you delete a post, it is gone forever.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                No, keep this post
              </Button>
              <Button
                onClick={() => this.deletePost(this.props.match.params.id)}
                color="primary"
                autoFocus
              >
                Delete this post
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    return (
      <div>
        <CircularProgress
          className={classes.progress}
          color="primary"
          disableShrink
        />
      </div>
    );
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  edit: {
    margin: theme.spacing.unit,
    backgroundColor: "#ffa500",
    color: "white",
    "&:hover": {
      backgroundColor: fade("#ffa500", 0.75)
    }
  },
  remove: {
    margin: theme.spacing.unit,
    backgroundColor: "#dc3545",
    color: "white",
    "&:hover": {
      backgroundColor: fade("#dc3545", 0.75)
    }
  },
  card: {
    maxWidth: 800,
    margin: "0 auto"
  },
  actions: {
    display: "flex"
  },
  media: {
    maxWidth: 800
  }
});

const mapStateToProps = state => ({
  post: state.post,
  fetchingPost: state.fetchingPost,
  error: state.error
});

const PostPageStyles = withStyles(styles)(PostPage);
export default connect(
  mapStateToProps,
  { getPost, deletePost, handleError }
)(PostPageStyles);
