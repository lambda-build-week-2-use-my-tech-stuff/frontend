import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import MediaCard from './MediaCard';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { getProfile, editProfile, getPosts, filterProfile } from '../actions';
import { connect } from 'react-redux';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

class ProfilePage extends Component {

  state = {
    isEditing: false,
    user: {
      email: null,
      id: this.props.match.params.id,
      profile: {
        firstName: "",
        lastName: "",
        city: "",
        state: "",
        zip: "",
        dob: "",
      }
    }
  }

  componentDidMount() {
    if (this.props.currentProfile) {
      if (this.state.user.id !== this.props.currentProfile._id) {
        this.props.getProfile(this.state.user.id);
      }
      else {
        this.setState({ user: {
          ...this.state.user,
          profile: {
          firstName: this.props.currentProfile.profile.firstName,
          lastName: this.props.currentProfile.profile.lastName,
          city: this.props.currentProfile.profile.city,
          state: this.props.currentProfile.profile.state,
          zip: this.props.currentProfile.profile.zip,
          dob: this.props.currentProfile.profile.dob
        }
        }})
      }
    }
    if (!this.props.currentProfile) {
      this.props.getProfile(this.state.user.id);
    }
    if (this.props.posts.length === 0) {
      this.props.getPosts();
    }
    if (this.props.profilePosts.length === 0) {
      this.props.filterProfile(this.state.user.id);
    }
    if (this.props.profilePosts.length !== 0) {
      if (this.props.profilePosts[0].createdBy !== this.state.user.id) {
        this.props.filterProfile(this.state.user.id)
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchingProfile && !this.props.fetchingProfile && !this.props.error) {
      this.setState({
        user: {
          ...this.state.user,
          email: this.props.currentProfile.email,
          profile: {
            ...this.props.currentProfile.profile
          }
        }
      })
    }
    if (prevProps.fetchingPosts && !this.props.fetchingPosts && !this.props.error) {
      this.props.filterProfile(this.state.user.id);
    }
  }

  editToggler = e => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  editHandler = e => {
    e.preventDefault();
    this.setState({
      user: {
        ...this.state.user,
        profile: {
          ...this.state.user.profile,
          [e.target.name]:e.target.value
        }
      }
    })
  }

  editProfile = (e, profile) => {
    e.preventDefault();
    this.props.editProfile(profile)
    this.editToggler();
  }

  render() {
    const { classes, profilePosts } = this.props;
    const { firstName, lastName, city, state, zip } = this.state.user.profile;

    if (this.props.fetchingPosts) {
      return (
        <div className="loading">
          <Loader type="Oval" color="#00bfff" height="150" width="100" />
        </div>
      )
    }

    return (
      <div className='profileContainer'>
        <div className='profilePageHeader' >
            <h2>{`${firstName} ${lastName}`}s Profile Page</h2>
            <img alt={firstName} />
        </div>
        {/* onSubmit={this.editSubmitter} */}
        <form className='profilePage'  onSubmit={e => this.editProfile(e, this.state.user)} >
            {/* <input placeholder='Username/email' className='inputField' /> */}
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='firstName' placeholder='First Name' value={firstName} className='inputField' /> : <p>{`${firstName} ${lastName}`}</p>}
            <br />
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='lastName' placeholder='Last Name' value={lastName} className='inputField' /> : null}
            <br />
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='city' placeholder='City' value={city} className='inputField' /> : <p>{city}</p>}
            <br />
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='state' placeholder='State' value={state} className='inputField' /> : <p>{state}</p>}
            <br />
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='zip' placeholder='ZIP code' value={zip} className='inputField' /> : <p>{zip}</p>}
            <br />
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='dob' placeholder='D.O.B.' className='inputField' /> : <p>{this.state.user.profile.dob}</p>}
            <br />
            {this.state.isEditing && <Button onClick={e => this.editProfile(e, this.state.user)} type="submit" variant="contained" className={classes.edit} >Update Info</Button>} {!this.state.isEditing && <Button type="submit" onClick={this.editToggler} variant="contained" className={classes.edit}>Edit Info</Button> }
        </form>


        {/* <form className='profilePage' >
          {/* <input placeholder='Username' className='inputField' /> */}
          {/* <input placeholder='Name' onChange={this.changeHandler} name="name" value={this.state.profile.name} className='inputField' />
          <input placeholder='Date of Birth' onChange={this.changeHandler} name="dob" value={this.state.profile.dob}  className='inputField' />
          <input placeholder='Location' onChange={this.changeHandler} name="location" value={this.state.profile.location}  className='inputField' />
          <textarea placeholder='Bio' onChange={this.changeHandler} name="bio" value={this.state.profile.bio} className='inputField' /> */}

        {/* </form> */}

        {/* /////////////User's Posts */}
        <div className='profilePostHeader'>
            <h2 className='userNameTitle'>{`${firstName} ${lastName}`}s Posts</h2>
              <Fab aria-label="Add" size="large" color="primary" className={classes.add} component={Link} to="/postform">
                <AddIcon />
              </Fab>
        </div>

        <div className='profilePosts' >
            {profilePosts.map(post => <MediaCard key={post._id} title={post.postTitle} description={post.description} image={post.postImage} id={post._id} />)}
        </div>
       </div>
    )
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  add: {
    margin: theme.spacing.unit,
    color: 'white',
    '&:hover': {
      backgroundColor: fade('#0087ea', .75),
    },
  },
  edit: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffa500',
    color: 'white',
    '&:hover': {
      backgroundColor: fade('#ffa500', .75),
    },
  },
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

const mapStateToProps = state => ({
  currentProfile: state.currentProfile,
  error: state.error,
  posts: state.posts,
  fetchingProfile: state.fetchingProfile,
  profilePosts: state.profilePosts,
  fetchingPosts: state.fetchingPosts
})

const ProfilePageStyles = withStyles(styles)(ProfilePage);
export default connect(mapStateToProps, { getProfile, editProfile, getPosts, filterProfile })(ProfilePageStyles);
