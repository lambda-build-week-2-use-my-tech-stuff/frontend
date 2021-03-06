import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { getPosts, handleError } from "../actions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

class AdvancedGridList extends Component {
  componentDidMount() {
    if (this.props.posts.length === 0) {
      this.props.getPosts();
    } else if (this.props.error !== null) {
      this.props.handleError();
    }
  }

  render() {
    const { classes, posts, searchedPosts } = this.props;

    if (this.props.fetchingPosts) {
      return (
        <div className="loading">
          <Loader type="Oval" color="#0a4e8a" height="120" width="80" />
        </div>
      );
    }

    return (
      <>
        <div className={classes.root}>
          <GridList cellHeight={300} spacing={1} className={classes.gridList}>
            {this.props.searchInput.length > 0
              ? searchedPosts.map(post => (
                  <GridListTile
                    key={post._id}
                    cols={0.5}
                    rows={1}
                    component={Link}
                    to={`/postpages/${post._id}`}
                  >
                    <img
                      src={post.postImage}
                      alt={post.item_name}
                      width="432"
                    />
                    <GridListTileBar
                      title={post.postTitle}
                      titlePosition="top"
                      subtitle={post.city}
                      actionIcon={
                        <IconButton className={classes.icon}>
                          <StarBorderIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                      className={classes.titleBar}
                    />
                  </GridListTile>
                ))
              : posts.map(post => (
                  <GridListTile
                    key={post._id}
                    cols={0.5}
                    rows={1}
                    component={Link}
                    to={`/postpages/${post._id}`}
                  >
                    <img
                      src={post.postImage}
                      alt={post.item_name}
                      width="432"
                    />
                    <GridListTileBar
                      title={post.postTitle}
                      titlePosition="top"
                      subtitle={post.city}
                      actionIcon={
                        <IconButton className={classes.icon}>
                          <StarBorderIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                      className={classes.titleBar}
                    />
                  </GridListTile>
                ))}
          </GridList>
        </div>
      </>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1762,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
});

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  searchedPosts: state.postsReducer.searchedPosts,
  searchInput: state.postsReducer.searchInput,
  fetchingPosts: state.postsReducer.fetchingPosts,
  error: state.postsReducer.error
});

AdvancedGridList.propTypes = {
  classes: PropTypes.object.isRequired
};
const styledComponent = withStyles(styles)(AdvancedGridList);
export default connect(
  mapStateToProps,
  { getPosts, handleError }
)(styledComponent);
