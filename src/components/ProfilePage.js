import React, { Component } from 'react';
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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  add: {
    margin: theme.spacing.unit,
    backgroundColor: '#24dc8e',
    color: 'white',
    '&:hover': {
      backgroundColor: fade('#24dc8e', .75),
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
   button: {
    margin: theme.spacing.unit,
  },
  edit: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffa500',
    color: 'white',
    '&:hover': {
      backgroundColor: fade('#ffa500', .75),
    },
  },
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      user: {
        email: null,
        id: this.props.match.params.id,
        profile: {
          firstName: "Name",
          lastName: "",
          city: "City",
          state: "State",
          zip: "Zip",
          dob: "Date of Birth",
        }
      }
    }
  }

  componentDidMount() {
    this.props.getProfile(this.state.user.id);
    this.props.getPosts();
    this.props.filterProfile()
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
      this.props.filterProfile();
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
    const { classes } = this.props;
    return (
      <div className='profileContainer'>
        <div className='profilePageHeader' >
            <h2>{`${this.state.user.profile.firstName} ${this.state.user.profile.lastName}`}s Profile Page</h2>
            <img />
        </div>
        {/* onSubmit={this.editSubmitter} */}
        <form className='profilePage'  onSubmit={e => this.editProfile(e, this.state.user)} >
            {/* <input placeholder='Username/email' className='inputField' /> */}
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='firstName' placeholder='First Name' className='inputField' /> : <p>{`${this.state.user.profile.firstName} ${this.state.user.profile.lastName}`}</p>}
            <br />
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='lastName' placeholder='Last Name' className='inputField' /> : null}
            <br />
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='city' placeholder='City' className='inputField' /> : <p>{this.state.user.profile.city}</p>}
            <br />
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='state' placeholder='State' className='inputField' /> : <p>{this.state.user.profile.state}</p>}
            <br />
            {this.state.isEditing ? <TextField onChange={this.editHandler} name='zip' placeholder='ZIP code' className='inputField' /> : <p>{this.state.user.profile.zip}</p>}
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
            <h2 className='userNameTitle'>{`${this.state.user.profile.firstName} ${this.state.user.profile.lastName}`}s Posts</h2>
              <Fab aria-label="Add" size="large" className={classes.add} component={Link} to="/postform">
                <AddIcon />
              </Fab>
        </div>
        <div className='profilePosts' >
            {this.props.posts.map(post => <MediaCard key={post._id} title={post.postTitle} description={post.description} id={post._id} />)}
        </div>
       </div>
    )
  }
}

const ProfilePageStyles = withStyles(styles)(ProfilePage);

const mapStateToProps = state => ({
  currentProfile: state.currentProfile,
  error: state.error,
  fetchingProfile: state.fetchingProfile,
  posts: state.posts,
  fetchingPosts: state.fetchingPosts
})

export default connect(mapStateToProps, { getProfile, editProfile, getPosts, filterProfile })(ProfilePageStyles);
