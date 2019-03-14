import React, { Component } from 'react';
import MediaCard from './MediaCard';
import Button from '@material-ui/core/Button';
import { editProfile } from '../actions';
import { connect } from 'react-redux';

class ProfilePage extends Component {
  constructor() {
    super();
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
          <Button type='submit' onClick={this.editToggler} variant="contained" color="secondary">{this.state.isEditing ? 'Save Info' : 'Update Info'}</Button>
          </form>


        
        {/* <form className='profilePage' >
          {/* <input placeholder='Username' className='inputField' /> */}
          {/* <input placeholder='Name' onChange={this.changeHandler} name="name" value={this.state.profile.name} className='inputField' />
          <input placeholder='Date of Birth' onChange={this.changeHandler} name="dob" value={this.state.profile.dob}  className='inputField' />
          <input placeholder='Location' onChange={this.changeHandler} name="location" value={this.state.profile.location}  className='inputField' />
          <textarea placeholder='Bio' onChange={this.changeHandler} name="bio" value={this.state.profile.bio} className='inputField' /> */} 
          
        {/* </form> */}

        {/* /////////////User's Posts */}
        <h2 className='userNameTitle'>*USERNAME HERE* Posts</h2>
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

export default connect(null, { editProfile })(ProfilePage);
