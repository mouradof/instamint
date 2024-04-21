import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComments, faRetweet, faBars, faTrash } from "@fortawesome/free-solid-svg-icons";

const ProfileHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="w-full h-56 bg-cover bg-center relative" style={{ backgroundImage: `url("/images/cover.png")` }}>
      <div className="absolute top-4 left-4">
        <img
          src="/images/logo-Instamint.png" 
          alt="Company Logo"
          className="h-29 w-14"
        />
      </div>
      <div className="absolute top-4 right-4">
        <button 
          onClick={toggleMenu}
          className="p-2 text-white bg-gray-800 bg-opacity-75 rounded-full hover:bg-opacity-100 transition-opacity duration-300"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-12 bg-white rounded shadow-lg w-48">
            <ul className="text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => window.location.href = 'profile/editProfile'}>
                Edit Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => window.location.href = 'profile/deleteAccount'}>
                Delete Account
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileContent = ({ userData }) => (
  <div className="w-3/4 mt-4 px-4 flex flex-col items-center">
    <div className="flex w-full items-center">
      <img
        src={userData.profilePicture || "/images/default-profile-picture.jpg"}
        alt="Profile"
        className="h-24 w-24 rounded-full border-4 border-white bg-white mr-4"
      />
      <div className="flex flex-grow justify-between items-center w-full">
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">{userData.followers || '0'}</span>
          <span className="text-sm text-gray-600">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">{userData.following || '0'}</span>
          <span className="text-sm text-gray-600">Following</span>
        </div>
      </div>
    </div>
    <div className="text-left w-full mt-4">
      <div className="text-2xl font-bold">{userData.username || 'Username'}</div>
      <div className="text-sm text-gray-600">{userData.bio || 'Bio goes here...'}</div>
    </div>
  </div>
);

const ProfilePosts = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isImageFullscreen, setImageFullscreen] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);
  const handleDeletePost = () => {
    alert("Post has been deleted (simulation).");
    setDropdownVisible(false);
  };
  const toggleImageFullscreen = () => setImageFullscreen(!isImageFullscreen);
  const toggleLike = () => setLiked(!liked);

  return (
    <div className="w-3/4 mx-auto bg-white shadow rounded-lg p-4">
      <div className="flex items-center mb-2">
        <img className="w-10 h-10 rounded-full mr-4" src="/images/default-profile-picture.jpg" alt="User avatar" />
        <span className="font-bold text-md">Darrell asidddd</span>
        <div className="ml-auto relative">
          <button onClick={toggleDropdown} className="p-2 rounded hover:bg-gray-200 transition duration-200">
            <FontAwesomeIcon icon={faBars} />
          </button>
          {isDropdownVisible && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
              <ul>
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <button onClick={handleDeletePost} className="flex items-center w-full">
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete Post
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="text-gray-600 text-sm mb-4">It's a new day in Cyprus...</div>
      <div className="mt-4 mb-8 cursor-pointer">
        <img
          src="/images/default-profile-picture.jpg"
          alt="Post visual content"
          className="w-1/2 h-auto object-cover rounded-lg shadow" 
          onClick={toggleImageFullscreen}
        />
        {isImageFullscreen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <button onClick={toggleImageFullscreen} className="absolute top-3 right-3 text-white text-xl">
              &times;
            </button>
            <img
              src="/images/default-profile-picture.jpg"
              alt="Post visual content"
              className="max-w-full max-h-full rounded-lg shadow"
            />
          </div>
        )}
      </div>
      <div className="flex justify-around w-full">
        <div className="flex items-center cursor-pointer" onClick={toggleLike}>
          <FontAwesomeIcon icon={faHeart} className={`h-4 w-4 mr-1 ${liked ? "text-red-500" : "text-gray-600"}`} />
          <span className="text-xs text-gray-600">10k</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => alert("Comment feature coming soon!")}>
          <FontAwesomeIcon icon={faComments} className="h-4 w-4 mr-1" />
          <span className="text-xs text-gray-600">500</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => alert("You retweeted this post!")}>
          <FontAwesomeIcon icon={faRetweet} className="h-4 w-4 mr-1" />
          <span className="text-xs text-gray-600">1.3k</span>
        </div>
      </div>
    </div>
  )
}

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    followers: 0,
    following: 0,
    bio: '',
    profilePicture: '/images/default-profile-picture.jpg'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Si aucun token, rediriger vers la page de connexion
      window.location.href = '/login';
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4002/api/user/1', {
          headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData({
          username: data.username,
          followers: data.followers,
          following: data.following,
          bio: data.bio,
          profilePicture: data.profilePicture || '/images/default-profile-picture.jpg'
        });
      } catch (error) {
        console.error('Error loading the user data:', error);
        window.location.href = '/login';
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <ProfileHeader />
      <ProfileContent userData={userData} />
      <ProfilePosts />
    </div>
  );
}

export default ProfilePage;