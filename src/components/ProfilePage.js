import React, { Component } from 'react';
import MediaCard from './MediaCard';
import Button from '@material-ui/core/Button';

export default class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      name: 'Name Here',
      dob: 'D.O.B. Here',
      location: 'Location Here',
      bio: 'Bio Here'
    }
  }

  editToggler = e => {
    this.setState({ isEditing: !this.state.isEditing })
  }
  editHandler = e => {
    this.setState({ [e.target.name] : e.target.value })
  }
editSubmitter = e => {
  this.setState({ name: this.state.name })
  this.setState({ name: this.state.dob })
  this.setState({ name: this.state.location })
  this.setState({ name: this.state.bio })
}

  render() {
    return (
      <div className='profileContainer'>
        <div className='profilePageHeader' >
            <h2>*USERNAME HERE*</h2>
            <img />
        </div>
        <form className='profilePage' onSubmit={this.editSubmitter} >
          {/* <input placeholder='Username' className='inputField' /> */}
          {this.state.isEditing ? <input onChange={this.editHandler} name='name' placeholder='Name' className='inputField' /> : <p>{this.state.name}</p>}
          {this.state.isEditing ? <input onChange={this.editHandler} name='dob' placeholder='Date of Birth' className='inputField' /> : <p>{this.state.dob}</p>}
          {this.state.isEditing ? <input onChange={this.editHandler} name='location' placeholder='Location' className='inputField' /> : <p>{this.state.location}</p>}
          {this.state.isEditing ? <textarea onChange={this.editHandler} name='bio' placeholder='Bio' className='inputField' /> : <p>{this.state.bio}</p>}
          <br />
          <Button onClick={this.editToggler} variant="contained" color="secondary">{this.state.isEditing ? 'Save Info' : 'Update Info'}</Button>
        </form>
        {/* /////////////User's Posts */}
        <h2 className='userNameTitle'>*USERNAME HERE* Post's</h2>
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
