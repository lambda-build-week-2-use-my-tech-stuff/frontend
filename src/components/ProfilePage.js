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
          firstName: "Name Here",
          lastName: "",
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
          email: this.props.currentProfile.email,
          profile: {
            ...this.props.currentProfile.profile
          }
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
            {this.state.isEditing ? <input onChange={this.editHandler} name='firstName' placeholder='First Name' className='inputField' /> : <p>{this.state.user.profile.firstName}</p>}
            {this.state.isEditing ? <input onChange={this.editHandler} name='lastName' placeholder='Last Name' className='inputField' /> : <p>{this.state.user.profile.lastName}</p>}
            {this.state.isEditing ? <input onChange={this.editHandler} name='city' placeholder='City' className='inputField' /> : <p>{this.state.user.profile.city}</p>}
            {this.state.isEditing ? <textarea onChange={this.editHandler} name='state' placeholder='State' className='inputField' /> : <p>{this.state.user.profile.state}</p>}
            <br />
            {this.state.isEditing ? <textarea onChange={this.editHandler} name='zip' placeholder='ZIP code' className='inputField' /> : <p>{this.state.user.profile.zip}</p>}
            <br />
            {this.state.isEditing ? <textarea onChange={this.editHandler} name='dob' placeholder='D.O.B.' className='inputField' /> : <p>{this.state.user.profile.dob}</p>}
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
