import React from "react";
import ProfileSidebar from "../../components/ProfileSidebar";
import UserProfile from "../../components/UserProfile/UserProfile";
import "./Profile.css";



function Profile() {
  
  return (
    <div className='profile-page-wrapper'>

      {/* Profile navbar */}

      <ProfileSidebar />

      {/* User profile content */}

      <UserProfile />

    </div>
  )
}

export default Profile;
