import React, { Component } from 'react';
import MediaCard from './MediaCard';
import Button from '@material-ui/core/Button';
import { getProfile, editProfile } from '../actions';
import { connect } from 'react-redux';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isEditing: false,
      user: {
        email: null,
        id: this.props.match.params.id,
        profile: {
          firstname: "Name Here",
          lastname: "",
          city: "",
          state: "",
          zip: "",
          dob: "D.O.B. Here",
        }
      }
    }
  }

  componentDidMount() {
    this.props.getProfile(this.state.user.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchingProfile && !this.props.fetchingProfile && !this.props.error) {
      this.setState({
        user: {
          ...this.state.user,
          email: this.props.currentProfile.email
        }
      })
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
    return (
      <div className='profileContainer'>
        <div className='profilePageHeader' >
            <h2>*USERNAME HERE*</h2>
            <img />
        </div>
        {/* onSubmit={this.editSubmitter} */}
        <form className='profilePage'  onSubmit={e => this.editProfile(e, this.state.user)} >
            {/* <input placeholder='Username/email' className='inputField' /> */}
            {this.state.isEditing ? <input onChange={this.editHandler} name='firstname' placeholder='Name' className='inputField' /> : <p>{this.state.user.profile.firstname}</p>}
            {this.state.isEditing ? <input onChange={this.editHandler} name='dob' placeholder='Date of Birth' className='inputField' /> : <p>{this.state.user.profile.dob}</p>}
            {this.state.isEditing ? <input onChange={this.editHandler} name='location' placeholder='Location' className='inputField' /> : <p>{this.state.user.profile.location}</p>}
            {this.state.isEditing ? <textarea onChange={this.editHandler} name='bio' placeholder='Bio' className='inputField' /> : <p>{this.state.user.profile.bio}</p>}
            <br />
            {this.state.isEditing && <Button onClick={e => this.editProfile(e, this.state.user)} type="submit" variant="contained" color="secondary">Update Info</Button>} {!this.state.isEditing && <Button type="button" onClick={this.editToggler} variant="contained" color="secondary">Edit Info</Button> }
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

const mapStateToProps = state => ({
  currentProfile: state.currentProfile,
  error: state.error,
  fetchingProfile: state.fetchingProfile
})

export default connect(mapStateToProps, { getProfile, editProfile })(ProfilePage);
