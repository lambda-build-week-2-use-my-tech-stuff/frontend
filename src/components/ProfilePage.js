import React, { Component } from 'react';
import MediaCard from './MediaCard';

export default class ProfilePage extends Component {
  render() {
    return (
      <div className='profileContainer'>
        <div className='profilePageHeader' >
            <h2>*USERNAME HERE*</h2>
            <img />
        </div>
        <form className='profilePage'>
          {/* <input placeholder='Username' className='inputField' /> */}
          <input placeholder='Name' className='inputField' />
          <input placeholder='Date of Birth' className='inputField' />
          <input placeholder='Location' className='inputField' />
          <textarea placeholder='Bio' className='inputField' />
          <button type='submit' className='updateBtn'>Update Info.</button>
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
