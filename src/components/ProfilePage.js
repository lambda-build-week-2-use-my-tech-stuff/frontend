import React, { Component } from 'react';
import MediaCard from './MediaCard';
import Button from '@material-ui/core/Button';
import { getProfile, editProfile } from '../actions';
import { connect } from 'react-redux';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      profile: {
        firstname: "Name Here",
        lastname: "",
        city: "",
        state: "",
        zip: "",
        dob: "D.O.B. Here",
        id: this.props.match.params.id
      }
    }
  }

  componentDidMount() {
    this.props.getProfile(this.state.profile.id);
  }

  editToggler = e => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  editHandler = e => {
    e.preventDefault();
    this.setState({
      profile: {
        ...this.state.profile,
        [e.target.name]:e.target.value
      }
    })
  }

  editProfile = (e, profile) => {
    e.preventDefault();
    this.props.editProfile(profile)
    this.editToggler();
  }

  render() {
    return (
      <div className='profileContainer'>
        <div className='profilePageHeader' >
            <h2>*USERNAME HERE*</h2>
            <img />
        </div>
        {/* onSubmit={this.editSubmitter} */}
        <form className='profilePage'  onSubmit={e => this.editProfile(e, this.state.profile)} >
            {/* <input placeholder='Username/email' className='inputField' /> */}
            {this.state.isEditing ? <input onChange={this.editHandler} name='firstname' placeholder='Name' className='inputField' /> : <p>{this.state.profile.firstname}</p>}
            {this.state.isEditing ? <input onChange={this.editHandler} name='dob' placeholder='Date of Birth' className='inputField' /> : <p>{this.state.profile.dob}</p>}
            {this.state.isEditing ? <input onChange={this.editHandler} name='location' placeholder='Location' className='inputField' /> : <p>{this.state.profile.location}</p>}
            {this.state.isEditing ? <textarea onChange={this.editHandler} name='bio' placeholder='Bio' className='inputField' /> : <p>{this.state.profile.bio}</p>}
            <br />
            {this.state.isEditing && <Button onClick={e => this.editProfile(e, this.state.profile)} type="submit" variant="contained" color="secondary">Update Info</Button>} {!this.state.isEditing && <Button type="button" onClick={this.editToggler} variant="contained" color="secondary">Edit Info</Button> }
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

export default connect(null, { getProfile, editProfile })(ProfilePage);
