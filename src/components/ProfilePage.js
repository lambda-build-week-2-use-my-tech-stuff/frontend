import React, { Component } from 'react';
import MediaCard from './MediaCard';
import { connect } from 'react-redux';
import { editProfile } from '../actions';

class ProfilePage extends Component {

  state = {
    profile: {
      name: '',
      dob: '',
      location: '',
      bio: ''
    }
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
        <form className='profilePage' onSubmit={e => this.editProfile(e, this.state.profile)}>
          {/* <input placeholder='Username' className='inputField' /> */}
          <input placeholder='Name' name="name" value={this.state.profile.name} className='inputField' />
          <input placeholder='Date of Birth' name="dob" value={this.state.profile.dob}  className='inputField' />
          <input placeholder='Location' name="location" value={this.state.profile.location}  className='inputField' />
          <textarea placeholder='Bio' name="bio" value={this.state.profile.bio} className='inputField' />
          <button type='submit' className='updateBtn'>Update Info.</button>
        </form>
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
