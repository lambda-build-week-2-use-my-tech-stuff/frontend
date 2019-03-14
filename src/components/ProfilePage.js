import React, { Component } from 'react';
import MediaCard from './MediaCard';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { editProfile } from '../actions';
import { connect } from 'react-redux';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'

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
  }
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        isEditing: false,
        name: 'Name Here',
        dob: 'D.O.B. Here',
        location: 'Location Here',
        bio: 'Bio Here'
      }
    }
  }

  editToggler = e => {
    this.setState({ isEditing: !this.state.isEditing })
  }
  editHandler = e => {
    this.setState({ [e.target.name] : e.target.value })
  }
editSubmitter = e => {
  e.preventDefault();
  this.setState({ name: this.state.profile.name })
  this.setState({ name: this.state.profile.dob })
  this.setState({ name: this.state.profile.location })
  this.setState({ name: this.state.profile.bio })
}
editProfile = (e, profile) => {
  e.preventDefault();
  this.props.editProfile(profile)
}

  render() {
    const { classes } = this.props;
    return (
      <div className='profileContainer'>
        <div className='profilePageHeader' >
            <h2>*USERNAME HERE*</h2>
            <img />
        </div>
        {/* onSubmit={this.editSubmitter} */}
        <form className='profilePage'  onSubmit={this.editSubmitter} >
          {/* <input placeholder='Username/email' className='inputField' /> */}
          {this.state.isEditing ? <input onChange={this.editHandler} name='name' placeholder='Name' className='inputField' /> : <p>{this.state.profile.name}</p>}
          {this.state.isEditing ? <input onChange={this.editHandler} name='dob' placeholder='Date of Birth' className='inputField' /> : <p>{this.state.profile.dob}</p>}
          {this.state.isEditing ? <input onChange={this.editHandler} name='location' placeholder='Location' className='inputField' /> : <p>{this.state.profile.location}</p>}
          {this.state.isEditing ? <textarea onChange={this.editHandler} name='bio' placeholder='Bio' className='inputField' /> : <p>{this.state.profile.bio}</p>}
          <br />
          <Button type='submit' onClick={this.editToggler} variant="contained" className={classes.edit} >{this.state.isEditing ? 'Update Info' : 'Edit Info'}</Button>
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
            <h2 className='userNameTitle'>*USERNAME HERE* Posts</h2>
              <Fab aria-label="Add" size="large" className={classes.add} component={Link} to="/postform">
                <AddIcon />
              </Fab>
        </div>
        <div className='profilePosts' >
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
        </div>
       </div>
    )
  }
}


const ProfilePageStyles = withStyles(styles)(ProfilePage);
export default connect(null, { editProfile })(ProfilePageStyles);
